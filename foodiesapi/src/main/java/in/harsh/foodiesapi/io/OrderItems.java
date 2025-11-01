package in.harsh.foodiesapi.io;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderItems {
    private String foodId;
    private int quantity;
    private double price;
    private String imageUrl;
    private String category;
    private String description;
    private String name;

}
