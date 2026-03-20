package com.fooddeliveryapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "delivery_agents")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryAgent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "agent_id")
    private Long agentId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "vehicle_type")
    private String vehicleType;

    @Column(name = "is_available")
    private Boolean isAvailable;
}