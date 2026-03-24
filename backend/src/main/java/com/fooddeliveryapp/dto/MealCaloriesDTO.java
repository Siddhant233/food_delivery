package com.fooddeliveryapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MealCaloriesDTO {

    private String meal;

    private Integer calories;
}
