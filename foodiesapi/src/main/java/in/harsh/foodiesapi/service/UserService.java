package in.harsh.foodiesapi.service;

import in.harsh.foodiesapi.io.UserRequest;
import in.harsh.foodiesapi.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);

    String findByUserId();
}
