package in.harsh.foodiesapi.service;

import com.razorpay.RazorpayException;
import in.harsh.foodiesapi.io.OrderRequest;
import in.harsh.foodiesapi.io.OrderResponse;
import org.json.JSONException;

import java.util.*;
import java.util.Map;

public interface OrderService {

    OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException, JSONException;

    void verifyPayment(Map<String, String> paymentData , String status);

    List<OrderResponse> getUserOrders();

    void removeOrder(String orderId);

    List<OrderResponse> getOrderOfAllUsers();

    void updateOrderStatus(String orderId, String status);


}
