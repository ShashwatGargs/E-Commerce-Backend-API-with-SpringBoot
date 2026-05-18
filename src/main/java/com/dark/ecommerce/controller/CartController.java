package com.dark.ecommerce.controller;

import com.dark.ecommerce.dto.CartItemDTO;
import com.dark.ecommerce.entity.CartItem;
import com.dark.ecommerce.service.CartService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    public CartController(
            CartService cartService
    ) {
        this.cartService = cartService;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public String addToCart(
            @RequestBody CartItemDTO dto,
            Authentication authentication
    ) {

        return cartService.addToCart(
                dto,
                authentication
        );
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping
    public List<CartItem> getCart(
            Authentication authentication
    ) {

        return cartService.getCart(authentication);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/{id}")
    public String removeFromCart(
            @PathVariable Long id
    ) {

        return cartService.removeFromCart(id);
    }
}