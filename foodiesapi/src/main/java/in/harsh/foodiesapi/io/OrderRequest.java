package in.harsh.foodiesapi.io;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OrderRequest {

    private String userAddress;
    private List<OrderItems> orderedItems;
    private double amount;
    private String phoneNumber;
    private String email;
    private String orderStatus;
}
