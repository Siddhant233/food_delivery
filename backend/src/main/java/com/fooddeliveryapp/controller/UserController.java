package com.fooddeliveryapp.controller;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.List;

import com.fooddeliveryapp.dto.DailyCalorieTrackerDTO;
import com.fooddeliveryapp.entity.User;
import com.fooddeliveryapp.service.NutritionService;
import com.fooddeliveryapp.service.UserService;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final NutritionService nutritionService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/{id}/calorie-tracker")
    public DailyCalorieTrackerDTO getDailyCalorieTracker(@PathVariable Long id) {
        return nutritionService.getDailyTracker(id);
    }
}
