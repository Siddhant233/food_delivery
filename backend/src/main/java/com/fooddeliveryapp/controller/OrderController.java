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
    public Order createOrder(@RequestBody com.fooddeliveryapp.dto.OrderCreationDTO requestDTO,
                             java.security.Principal principal) {
        // principal.getName() will return the email since we set UserDetails username to email
        return orderService.createOrder(requestDTO, principal.getName());
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrders(@PathVariable Long userId) {
        return orderService.getUserOrders(userId);
    }
}