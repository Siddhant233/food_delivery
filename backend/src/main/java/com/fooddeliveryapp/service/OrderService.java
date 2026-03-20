package com.fooddeliveryapp.service;

import com.fooddeliveryapp.dto.OrderCreationDTO;
import com.fooddeliveryapp.entity.*;
import com.fooddeliveryapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final AddressRepository addressRepository;
    private final MenuItemRepository menuItemRepository;

    @org.springframework.transaction.annotation.Transactional
    public Order createOrder(OrderCreationDTO dto, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Restaurant restaurant = restaurantRepository.findById(dto.getRestaurantId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        // Save the delivery string as a new Address entity attached to the User
        Address address = new Address();
        address.setStreet(dto.getDeliveryAddress());
        address.setCity(""); // default to empty
        address.setState(""); // default to empty
        address.setPincode(""); // default to empty
        address.setUser(user);
        address = addressRepository.save(address);

        // Create the core order
        Order order = new Order();
        order.setUser(user);
        order.setRestaurant(restaurant);
        order.setAddress(address);
        order.setTotalAmount(dto.getTotalAmount());
        order.setOrderStatus("PLACED");
        order.setCreatedAt(LocalDateTime.now());
        
        Order savedOrder = orderRepository.save(order);

        // Save order items
        if (dto.getItems() != null) {
            for (OrderCreationDTO.OrderItemRequest reqItem : dto.getItems()) {
                MenuItem menuItem = menuItemRepository.findById(reqItem.getItemId())
                        .orElseThrow(() -> new RuntimeException("Menu item not found"));

                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(savedOrder);
                orderItem.setMenuItem(menuItem);
                orderItem.setQuantity(reqItem.getQuantity());
                orderItem.setPrice(menuItem.getPrice() * reqItem.getQuantity());

                orderItemRepository.save(orderItem);
            }
        }

        return savedOrder;
    }

    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserUserId(userId);
    }
}
