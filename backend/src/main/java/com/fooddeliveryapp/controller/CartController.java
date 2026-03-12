package com.fooddeliveryapp.controller;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.List;

import com.fooddeliveryapp.entity.CartItem;
import com.fooddeliveryapp.entity.Cart;
import com.fooddeliveryapp.service.CartService;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public CartItem addItemToCart(@RequestBody Cart cart,
                                  @RequestParam Long menuItemId,
                                  @RequestParam int quantity) {

        return cartService.addItemToCart(cart, menuItemId, quantity);
    }

    @GetMapping("/{cartId}")
    public List<CartItem> getCartItems(@PathVariable Long cartId) {
        return cartService.getCartItems(cartId);
    }
}