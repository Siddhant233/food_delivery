package com.fooddeliveryapp.dto;

import lombok.Data;

@Data
public class CartRequestDTO {

    private Long userId;

    private Long menuItemId;

    private int quantity;
}