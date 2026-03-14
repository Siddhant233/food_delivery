package com.fooddeliveryapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class DailyCalorieTrackerDTO {

    private Long userId;

    private String date;

    private Integer targetCalories;

    private Integer consumedCalories;

    private Integer remainingCalories;

    private List<MealCaloriesDTO> mealBreakdown;
}
