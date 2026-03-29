package com.fooddeliveryapp.controller;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.List;

import com.fooddeliveryapp.entity.Order;
import com.fooddeliveryapp.entity.User;
import com.fooddeliveryapp.entity.Restaurant;
import com.fooddeliveryapp.entity.Address;
import com.fooddeliveryapp.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public Order createOrder(@RequestBody User user,
                             @RequestBody Restaurant restaurant,
                             @RequestBody Address address,
                             @RequestParam Double totalAmount) {

        return orderService.createOrder(user, restaurant, address, totalAmount);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrders(@PathVariable Long userId) {
        return orderService.getUserOrders(userId);
    }
}