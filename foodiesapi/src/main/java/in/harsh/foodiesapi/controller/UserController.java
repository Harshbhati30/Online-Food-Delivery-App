package in.harsh.foodiesapi.controller;

import in.harsh.foodiesapi.io.UserRequest;
import in.harsh.foodiesapi.io.UserResponse;
import in.harsh.foodiesapi.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody UserRequest request){
        UserResponse response = userService.registerUser(request);
        return response;
    }
}
