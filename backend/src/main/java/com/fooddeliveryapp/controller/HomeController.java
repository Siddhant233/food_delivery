package com.fooddeliveryapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> home() {
        return Map.of(
                "status", "ok",
                "message", "Food Delivery API is running",
                "time", LocalDateTime.now().toString()
        );
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of(
                "status", "UP",
                "service", "food-delivery-backend",
                "time", LocalDateTime.now().toString()
        );
    }

    @GetMapping("/api")
    public Map<String, Object> apiIndex() {
        return Map.of(
                "message", "Available API groups",
                "endpoints", List.of(
                        "/api/users",
                        "/api/restaurants",
                        "/api/menu/{restaurantId}",
                        "/api/menu/recommendations",
                        "/api/orders/user/{userId}",
                        "/api/users/{id}/calorie-tracker",
                        "/api/cart/{cartId}",
                        "/api/payments"
                )
        );
    }
}
