package in.harsh.foodiesapi.service;

import com.mongodb.internal.operation.ClientBulkWriteOperation;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import in.harsh.foodiesapi.entity.OrderEntity;
import in.harsh.foodiesapi.io.OrderRequest;
import in.harsh.foodiesapi.io.OrderResponse;
import in.harsh.foodiesapi.repository.CartRepository;
import in.harsh.foodiesapi.repository.FoodRepository;
import in.harsh.foodiesapi.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Value("${razorpay_key}")
    private String RAZORPAY_KEY;
    @Value("${razorpay_secret}")
    private String RAZORPAY_SECRET;

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private  UserService userService;
    @Autowired
    private CartRepository cartRepository;


    @Override
    public OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException,JSONException {
        OrderEntity newOrder= convertToEntity(request);
        newOrder = orderRepository.save(newOrder);


        RazorpayClient razorpayClient = new RazorpayClient(RAZORPAY_KEY, RAZORPAY_SECRET);
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount" ,newOrder.getAmount() *100);
        orderRequest.put("currency", "INR");
        orderRequest.put("payment_capture", 1);

        Order razorpayOrder = razorpayClient.orders.create(orderRequest);
        newOrder.setRazorpayOrderId(razorpayOrder.get("id"));
        String loggedInUser= userService.findByUserId();
        newOrder.setUserId(loggedInUser);
        newOrder = orderRepository.save(newOrder);
        return convertToResponse(newOrder);

    }

    @Override
    public void verifyPayment(Map<String, String> paymentData, String status) {
        String razorpayOrderId = paymentData.get("razorpay_order_id");
        OrderEntity existingOrder = orderRepository.findByrazorpayOrderId(razorpayOrderId)
                .orElseThrow(() -> new RuntimeException("Order Not Found"));
        existingOrder.setPaymentStatus(status);
        existingOrder.setRazorpaySignature(paymentData.get("razorpay_signature"));
        existingOrder.setRazorpayPaymentId(paymentData.get("razorpay_payment_id"));
        orderRepository.save(existingOrder);
        if("paid".equalsIgnoreCase((status))){
            cartRepository.deleteByUserId(existingOrder.getUserId());

        }
    }

    @Override
    public List<OrderResponse> getUserOrders() {
        String loggedInUser= userService.findByUserId();
        List<OrderEntity> list = orderRepository.findByUserId(loggedInUser);
        return list.stream().map(entity -> convertToResponse(entity)).collect(Collectors.toList());
    }

    @Override
    public void removeOrder(String orderId) {
        orderRepository.deleteById(orderId);
    }

    @Override
    public List<OrderResponse> getOrderOfAllUsers() {
        List<OrderEntity> list = orderRepository.findAll();
        return list.stream().map(entity -> convertToResponse(entity)).collect(Collectors.toList());
    }

    @Override
    public void updateOrderStatus(String orderId, String status) {
        OrderEntity entity = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not present"));
        entity.setOrderStatus(status);
        orderRepository.save(entity);
    }

    private OrderResponse convertToResponse(OrderEntity newOrder) {
        return OrderResponse.builder()
                .id(newOrder.getId())
                .amount((newOrder.getAmount()))
                .userAddress(newOrder.getUserAddress())
                .userId((newOrder.getUserId()))
                .razorpayOrderId((newOrder.getRazorpayOrderId()))
                .orderStatus((newOrder.getOrderStatus()))
                .paymentStatus(newOrder.getPaymentStatus())
                .email(newOrder.getEmail())
                .orderedItems(newOrder.getOrderedItems())
                .phoneNumber(newOrder.getPhoneNumber())
                .build();
    }

    private OrderEntity convertToEntity(OrderRequest request) {
        return OrderEntity.builder()
                .amount(request.getAmount())
                .userAddress(request.getUserAddress())
                .orderedItems(request.getOrderedItems())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail())
                .orderStatus(request.getOrderStatus())
                .build();
    }
}
