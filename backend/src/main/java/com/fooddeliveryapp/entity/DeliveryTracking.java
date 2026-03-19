package com.fooddeliveryapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryTracking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deliveryId;

    private String status;
    // PICKED_UP, ON_THE_WAY, DELIVERED

    private String currentLocation;

    private LocalDateTime pickupTime;

    private LocalDateTime deliveryTime;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "agent_id")
    private DeliveryAgent agent;
}