package com.fooddeliveryapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String phone;

    private String role;
    // CUSTOMER, ADMIN, DELIVERY

    private Integer age;

    private Double weightKg;

    private String fitnessGoal;

    private String dietPreference;

    private Integer dailyCalorieTarget;
}
