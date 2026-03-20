package com.fooddeliveryapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "addresses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Long addressId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String street;

    private String city;

    private String state;

    private String pincode;

    private Double latitude;

    private Double longitude;
}