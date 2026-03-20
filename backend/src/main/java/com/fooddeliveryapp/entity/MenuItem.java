package com.fooddeliveryapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "menu_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long menuItemId;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "item_name")
    private String itemName;

    private String description;

    private Double price;

    private Integer calories;

    @Column(name = "protein_grams")
    private Double proteinGrams;

    @Column(name = "carbs_grams")
    private Double carbsGrams;

    @Column(name = "fat_grams")
    private Double fatGrams;

    @Column(name = "is_available")
    private Boolean isAvailable;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
