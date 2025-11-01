package in.harsh.foodiesapi.entity;

import in.harsh.foodiesapi.io.OrderItems;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document( collection = "orders")
@Data
@Builder
public class OrderEntity {

    @Id
    private String id;
    private String userId;
    private String userAddress;
    private String phoneNumber;
    private String email;
    private List<OrderItems> orderedItems;
    private double amount;
    private String paymentStatus;
    private String razorpayOrderId;
    private String orderStatus;
    private String razorpaySignature;


}
