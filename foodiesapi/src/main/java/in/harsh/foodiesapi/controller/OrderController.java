package in.harsh.foodiesapi.controller;

import com.razorpay.RazorpayException;
import in.harsh.foodiesapi.io.OrderRequest;
import in.harsh.foodiesapi.io.OrderResponse;
import in.harsh.foodiesapi.service.OrderService;
import lombok.AllArgsConstructor;
import org.json.JSONException;
import org.mockito.internal.matchers.Or;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/create")
    public OrderResponse createOrderOrderWithPayment(@RequestBody OrderRequest request) throws JSONException, RazorpayException {
        OrderResponse response = orderService.createOrderWithPayment(request);
        return response;
    }

}
