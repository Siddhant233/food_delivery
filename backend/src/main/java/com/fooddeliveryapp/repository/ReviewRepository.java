package com.fooddeliveryapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fooddeliveryapp.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}