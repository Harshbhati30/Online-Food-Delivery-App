package in.harsh.foodiesapi.service;

import in.harsh.foodiesapi.io.CartRequest;
import in.harsh.foodiesapi.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();

    CartResponse removeFromCart(CartRequest cartRequest);
}
