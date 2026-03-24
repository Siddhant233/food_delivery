package com.fooddeliveryapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fooddeliveryapp.entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

}