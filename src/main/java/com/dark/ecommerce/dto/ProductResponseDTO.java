package com.dark.ecommerce.dto;

public class ProductResponseDTO {

    private Long id;

    private String name;

    private double price;

    private String description;

    private String imageUrl;



    public ProductResponseDTO() {
    }

    public ProductResponseDTO(
            Long id,
            String name,
            double price,
            String description,
            String imageUrl
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setDescription(String description) {
        this.description = description;
    }
        public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}