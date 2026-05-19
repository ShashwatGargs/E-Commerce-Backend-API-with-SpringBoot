package com.dark.ecommerce.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime orderDate;

    private double totalAmount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Order() {
    }

    public Order(
            Long id,
            LocalDateTime orderDate,
            double totalAmount,
            User user
    ) {
        this.id = id;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public User getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public void setUser(User user) {
        this.user = user;
    }
}