package com.fooddeliveryapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "restaurants")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "restaurant_id")
    private Long restaurantId;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    private String name;

    private String description;

    private String phone;

    private String address;

    private String city;

    private Double rating;

    @Column(name = "is_open")
    private Boolean isOpen;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}