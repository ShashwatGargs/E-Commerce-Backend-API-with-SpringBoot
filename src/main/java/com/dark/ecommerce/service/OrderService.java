package com.dark.ecommerce.service;

import com.dark.ecommerce.entity.*;
import com.dark.ecommerce.repository.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final CartItemRepository cartItemRepository;

    private final UserRepository userRepository;

    private final OrderRepository orderRepository;

    private final OrderItemRepository orderItemRepository;

    public OrderService(
            CartItemRepository cartItemRepository,
            UserRepository userRepository,
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository
    ) {
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    public String placeOrder(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        List<CartItem> cartItems =
                cartItemRepository.findByUser(user);

        if(cartItems.isEmpty()) {
            return "Cart is empty";
        }

        double totalAmount = 0;

        for(CartItem cartItem : cartItems) {

            totalAmount +=
                    cartItem.getProduct().getPrice()
                            * cartItem.getQuantity();
        }

        Order order = new Order();

        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setTotalAmount(totalAmount);

        Order savedOrder =
                orderRepository.save(order);

        for(CartItem cartItem : cartItems) {

            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(savedOrder);

            orderItem.setProduct(
                    cartItem.getProduct()
            );

            orderItem.setQuantity(
                    cartItem.getQuantity()
            );

            orderItem.setPrice(
                    cartItem.getProduct().getPrice()
            );

            orderItemRepository.save(orderItem);
        }

        cartItemRepository.deleteAll(cartItems);

        return "Order placed successfully";
    }

    public List<Order> getUserOrders(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        return orderRepository.findByUser(user);
    }
}