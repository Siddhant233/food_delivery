package com.fooddeliveryapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fooddeliveryapp.entity.DeliveryTracking;

public interface DeliveryTrackingRepository extends JpaRepository<DeliveryTracking, Long> {

}