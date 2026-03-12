package com.fooddeliveryapp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.fooddeliveryapp.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}