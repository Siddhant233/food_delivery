package com.fooddeliveryapp.controller;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing or invalid token");
        }
        return orderService.createOrder(requestDTO, principal.getName());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        ex.printStackTrace();
        String cause = ex.getCause() != null ? ex.getCause().getMessage() : "No nested cause";
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Server Error: " + ex.getMessage() + " | Cause: " + cause);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrders(@PathVariable Long userId) {
        return orderService.getUserOrders(userId);
    }
}