package com.fooddeliveryapp.controller;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.List;

import com.fooddeliveryapp.dto.FoodRecommendationResponseDTO;
import com.fooddeliveryapp.dto.HealthProfileRequestDTO;
import com.fooddeliveryapp.entity.MenuItem;
import com.fooddeliveryapp.service.MenuService;
import com.fooddeliveryapp.service.NutritionService;

@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;
    private final NutritionService nutritionService;

    @PostMapping
    public MenuItem addMenuItem(@RequestBody MenuItem item) {
        return menuService.addMenuItem(item);
    }

    @GetMapping("/{restaurantId}")
    public List<MenuItem> getMenu(@PathVariable Long restaurantId) {
        return menuService.getMenuByRestaurant(restaurantId);
    }

    @PostMapping("/recommendations")
    public FoodRecommendationResponseDTO getRecommendations(@RequestBody HealthProfileRequestDTO profile) {
        return nutritionService.getRecommendations(profile);
    }
}
