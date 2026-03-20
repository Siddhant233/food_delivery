package com.fooddeliveryapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "deliveries")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryTracking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "delivery_id")
    private Long deliveryId;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "agent_id")
    private DeliveryAgent agent;

    @Column(name = "pickup_time")
    private LocalDateTime pickupTime;

    @Column(name = "delivered_time")
    private LocalDateTime deliveredTime;

    private String status;
}