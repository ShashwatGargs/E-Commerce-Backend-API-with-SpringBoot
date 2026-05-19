package com.dark.ecommerce.controller;

import com.dark.ecommerce.entity.Order;
import com.dark.ecommerce.service.OrderService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(
            OrderService orderService
    ) {
        this.orderService = orderService;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public String placeOrder(
            Authentication authentication
    ) {

        return orderService.placeOrder(authentication);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping
    public List<Order> getOrders(
            Authentication authentication
    ) {

        return orderService.getUserOrders(authentication);
    }
}