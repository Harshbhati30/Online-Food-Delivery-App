package in.harsh.foodiesapi.service;

import in.harsh.foodiesapi.entity.CartEntity;
import in.harsh.foodiesapi.io.CartRequest;
import in.harsh.foodiesapi.io.CartResponse;
import in.harsh.foodiesapi.repository.CartRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService{

    private final CartRepository cartRepository;
    private final UserService userService;

    @Override
    public CartResponse addToCart(CartRequest request) {
        String loggedInUser= userService.findByUserId();

        Optional<CartEntity> cartoptional= cartRepository.findByUserId(loggedInUser);

        CartEntity cart = cartoptional.orElseGet(() -> new CartEntity(loggedInUser, new HashMap<>()));

        Map<String , Integer> cartItems= cart.getItems();

        cartItems.put(request.getFoodId(),cartItems.getOrDefault(request.getFoodId(),0)+ 1 );
        cart.setItems(cartItems);
        cart = cartRepository.save(cart);
        return convertToResponse(cart);
    }

    @Override
    public CartResponse getCart() {
        String loggedInUser= userService.findByUserId();
        CartEntity entity = cartRepository.findByUserId(loggedInUser)
                .orElse(new CartEntity(null ,loggedInUser, new HashMap<>()));

        return convertToResponse(entity);

    }

    private CartResponse convertToResponse(CartEntity cartEntity){
        return CartResponse.builder()
                .id(cartEntity.getId())
                .items(cartEntity.getItems())
                .userId(cartEntity.getUserId())
                .build();
    }
}
