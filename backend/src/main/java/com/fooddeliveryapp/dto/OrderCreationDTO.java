package com.fooddeliveryapp.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderCreationDTO {
    private Long restaurantId;
    private String deliveryAddress;
    private Double totalAmount;
    private List<OrderItemRequest> items;

    @Data
    public static class OrderItemRequest {
        private Long itemId;
        private Integer quantity;
    }
}
