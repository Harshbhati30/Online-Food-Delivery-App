package in.harsh.foodiesapi.service;

import com.razorpay.RazorpayException;
import in.harsh.foodiesapi.io.OrderRequest;
import in.harsh.foodiesapi.io.OrderResponse;
import org.json.JSONException;

public interface OrderService {

    OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException, JSONException;
}
