package in.harsh.foodiesapi.service;

import in.harsh.foodiesapi.entity.FoodEntity;
import in.harsh.foodiesapi.io.FoodRequest;
import in.harsh.foodiesapi.io.FoodResponse;
import in.harsh.foodiesapi.repository.FoodRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public String uploadFile(MultipartFile file) {
        return "";
    }

    @Override
    public FoodResponse addFood(FoodRequest request, MultipartFile file) {
        FoodEntity newFoodEntity = convertToEntity(request);
        String imageUrl =uploadFile(file);
        newFoodEntity.setImageUrl(imageUrl);
        newFoodEntity=foodRepository.save(newFoodEntity);
        return convertToResponse(newFoodEntity);
    }

    @Override
    public List<FoodResponse> readFoods() {
            List<FoodEntity> databaseEntries = foodRepository.findAll();
        return databaseEntries.stream().map(object ->  convertToResponse(object)).collect(Collectors.toList());
    }

    @Override
    public FoodResponse readFood(String id) {
        FoodEntity food= foodRepository.findById(id).orElseThrow(() -> new RuntimeException("Food not found with id: " + id));
        return convertToResponse(food);
    }




    private FoodEntity convertToEntity(FoodRequest request){
        return FoodEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category((request.getCategory()))
                .price(request.getPrice())
                .build();
    }
    private FoodResponse convertToResponse(FoodEntity entity){
        return FoodResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .price(entity.getPrice())
                .imageUrl(entity.getImageUrl())
                .build();
    }
}
