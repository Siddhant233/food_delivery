package com.fooddeliveryapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fooddeliveryapp.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}