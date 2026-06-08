package com.dark.ecommerce.dto;

public class OrderItemDTO {

    private String productName;

    private int quantity;

    private double price;

    public OrderItemDTO(
            String productName,
            int quantity,
            double price
    ) {
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
    }

    public String getProductName() {
        return productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public double getPrice() {
        return price;
    }
}