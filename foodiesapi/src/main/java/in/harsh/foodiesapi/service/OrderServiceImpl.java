package in.harsh.foodiesapi.service;

import com.mongodb.internal.operation.ClientBulkWriteOperation;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import in.harsh.foodiesapi.entity.OrderEntity;
import in.harsh.foodiesapi.io.OrderRequest;
import in.harsh.foodiesapi.io.OrderResponse;
import in.harsh.foodiesapi.repository.FoodRepository;
import in.harsh.foodiesapi.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

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
