package com.fooddeliveryapp.dto;
import lombok.Data;

@Data
public class OrderRequestDTO {

    private Long userId;

    private Long restaurantId;

    private Long addressId;

    private Double totalAmount;
}