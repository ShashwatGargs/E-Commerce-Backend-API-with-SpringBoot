package com.dark.ecommerce.service;

import com.dark.ecommerce.entity.Product;
import com.dark.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product updateProduct(Long id, Product updatedProduct) {

        Product existingProduct =
                productRepository.findById(id).orElse(null);

        if(existingProduct != null) {

            existingProduct.setName(updatedProduct.getName());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setDescription(updatedProduct.getDescription());

            return productRepository.save(existingProduct);
        }

        return null;
    }

    public String deleteProduct(Long id) {

        productRepository.deleteById(id);

        return "Product deleted successfully";
    }
}