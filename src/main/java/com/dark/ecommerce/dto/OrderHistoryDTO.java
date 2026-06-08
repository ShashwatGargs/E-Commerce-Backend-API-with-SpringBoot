package com.dark.ecommerce.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrderHistoryDTO {

    private Long id;

    private LocalDateTime orderDate;

    private double totalAmount;

    private List<OrderItemDTO> items;

    public OrderHistoryDTO(
            Long id,
            LocalDateTime orderDate,
            double totalAmount,
            List<OrderItemDTO> items
    ) {
        this.id = id;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.items = items;
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

    public List<OrderItemDTO> getItems() {
        return items;
    }
}