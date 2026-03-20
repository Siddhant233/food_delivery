package com.fooddeliveryapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    // @JsonIgnore
    private String password;

    private String phone;

    private String role;

    private Integer age;

    @Column(name = "weight_kg")
    private Double weightKg;

    @Column(name = "fitness_goal")
    private String fitnessGoal;

    @Column(name = "diet_preference")
    private String dietPreference;

    @Column(name = "daily_calorie_target")
    private Integer dailyCalorieTarget;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
