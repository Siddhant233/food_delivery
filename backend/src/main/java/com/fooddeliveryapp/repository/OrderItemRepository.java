package com.fooddeliveryapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fooddeliveryapp.entity.OrderItem;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findByOrderOrderId(Long orderId);

    List<OrderItem> findByOrderUserUserIdAndOrderOrderTimeBetween(Long userId,
                                                                  java.time.LocalDateTime start,
                                                                  java.time.LocalDateTime end);
}
