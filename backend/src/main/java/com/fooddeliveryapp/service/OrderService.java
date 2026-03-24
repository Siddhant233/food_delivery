package com.fooddeliveryapp.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import com.fooddeliveryapp.entity.*;
import com.fooddeliveryapp.repository.*;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    public Order createOrder(User user, Restaurant restaurant, Address address, Double totalAmount) {

        Order order = new Order();
        order.setUser(user);
        order.setRestaurant(restaurant);
        order.setAddress(address);
        order.setTotalAmount(totalAmount);
        order.setStatus("PLACED");
        order.setOrderTime(LocalDateTime.now());

        return orderRepository.save(order);
    }

    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserUserId(userId);
    }
}