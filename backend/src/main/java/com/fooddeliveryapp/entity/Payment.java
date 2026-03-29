package com.fooddeliveryapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    private String paymentMethod;
    // CARD, UPI, CASH_ON_DELIVERY

    private String paymentStatus;
    // SUCCESS, FAILED, PENDING

    private String transactionId;

    private LocalDateTime paymentTime;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;
}