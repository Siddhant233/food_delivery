package com.fooddeliveryapp.dto;

import lombok.Data;

@Data
public class HealthProfileRequestDTO {

    private Integer age;

    private Double weightKg;

    private String goal;

    private String diet;

    private Integer dailyCalorieTarget;
}
