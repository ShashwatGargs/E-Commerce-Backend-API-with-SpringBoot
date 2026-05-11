package com.dark.ecommerce.service;

import com.dark.ecommerce.entity.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    private final List<Product> products = new ArrayList<>();

    public Product addProduct(Product product) {
        products.add(product);
        return product;
    }

    public List<Product> getAllProducts() {
        return products;
    }

    public Product getProductById(Long id) {

        for (Product product : products) {
            if (product.getId().equals(id)) {
                return product;
            }
        }

        return null;
    }

    public Product updateProduct(Long id, Product updatedProduct) {

        for (Product product : products) {

            if (product.getId().equals(id)) {

                product.setName(updatedProduct.getName());
                product.setPrice(updatedProduct.getPrice());
                product.setDescription(updatedProduct.getDescription());

                return product;
            }
        }

        return null;
    }

    public String deleteProduct(Long id) {

        products.removeIf(product -> product.getId().equals(id));

        return "Product deleted";
    }
}   
