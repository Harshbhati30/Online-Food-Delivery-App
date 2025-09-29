package in.harsh.foodiesapi.service;

import in.harsh.foodiesapi.entity.UserEntity;
import in.harsh.foodiesapi.io.UserRequest;
import in.harsh.foodiesapi.io.UserResponse;
import in.harsh.foodiesapi.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse registerUser(UserRequest request) {
        UserEntity newUser= convertToEntity(request);
        newUser = userRepository.save(newUser);
        return convertToRespose(newUser);

    }

    private UserEntity convertToEntity(UserRequest request){
        return UserEntity.builder()
                .email(request.getEmail())
                .name(request.getName())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
    }

    private UserResponse convertToRespose(UserEntity registeredUser){
        return UserResponse.builder()
                .id(registeredUser.getId())
                .email(registeredUser.getEmail())
                .name(registeredUser.getName())
                .build();
    }
}
