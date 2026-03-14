package com.fooddeliveryapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class FoodRecommendationResponseDTO {

    private Integer suggestedDailyCalories;

    private String goal;

    private String diet;

    private List<RecommendedMenuItemDTO> recommendations;
}
