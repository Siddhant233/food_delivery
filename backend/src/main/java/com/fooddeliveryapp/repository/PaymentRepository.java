package com.fooddeliveryapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fooddeliveryapp.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

}