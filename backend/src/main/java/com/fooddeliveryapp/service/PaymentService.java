package com.fooddeliveryapp.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.fooddeliveryapp.entity.Payment;
import com.fooddeliveryapp.repository.PaymentRepository;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }
}