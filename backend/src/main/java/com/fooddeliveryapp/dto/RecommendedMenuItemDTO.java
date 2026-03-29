package com.fooddeliveryapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RecommendedMenuItemDTO {

    private Long menuItemId;

    private String name;

    private String description;

    private Double price;

    private Integer calories;

    private Double proteinGrams;

    private Double carbsGrams;

    private Double fatGrams;

    private String restaurantName;

    private String recommendationReason;
}
