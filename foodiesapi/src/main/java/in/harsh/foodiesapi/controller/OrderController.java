package in.harsh.foodiesapi.controller;

import com.razorpay.RazorpayException;
import in.harsh.foodiesapi.io.OrderRequest;
import in.harsh.foodiesapi.io.OrderResponse;
import in.harsh.foodiesapi.service.OrderService;
import lombok.AllArgsConstructor;
import org.json.JSONException;
import org.mockito.internal.matchers.Or;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createOrderOrderWithPayment(@RequestBody OrderRequest request) throws JSONException, RazorpayException {
        OrderResponse response = orderService.createOrderWithPayment(request);
        return response;
    }

    @PostMapping("/verify")
    public void verifyPayment(@RequestBody Map<String, String> paymentData){
        orderService.verifyPayment(paymentData, "paid");

    }

    @GetMapping
    public List<OrderResponse> getOrders(){
        return orderService.getUserOrders();
    }

    @DeleteMapping("/{orderId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrder(@PathVariable String orderId){
        orderService.removeOrder(orderId);
    }

    @GetMapping("/all")
    public List<OrderResponse> getOrdersOfAllUsers(){
        return orderService.getOrderOfAllUsers();
    }

    @PatchMapping("/status/{orderId}")
    public void udateOrderStatus(@PathVariable String orderId, @RequestParam String status){
        orderService.updateOrderStatus(orderId,status);
    }

}
