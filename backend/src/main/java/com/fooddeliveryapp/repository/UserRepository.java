package com.fooddeliveryapp.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.fooddeliveryapp.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

}