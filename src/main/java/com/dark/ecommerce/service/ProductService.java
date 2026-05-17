package com.dark.ecommerce.service;

import com.dark.ecommerce.dto.ProductRequestDTO;
import com.dark.ecommerce.dto.ProductResponseDTO;
import com.dark.ecommerce.entity.Product;
import com.dark.ecommerce.exception.ProductNotFoundException;
import com.dark.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
/*
  Service class containing business logic for product management.
  Handles product creation, retrieval, updating, and deletion
  while interacting with the repository layer.
 */
@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductResponseDTO addProduct(ProductRequestDTO dto) {

        Product product = new Product();

        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setDescription(dto.getDescription());

        Product savedProduct = productRepository.save(product);

        return mapToResponseDTO(savedProduct);
    }

    public List<ProductResponseDTO> getAllProducts() {

        return productRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    public ProductResponseDTO getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with ID: " + id
                        ));

        return mapToResponseDTO(product);
    }

    public ProductResponseDTO updateProduct(
            Long id,
            ProductRequestDTO dto
    ) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with ID: " + id
                        ));

        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setDescription(dto.getDescription());

        Product updatedProduct = productRepository.save(product);

        return mapToResponseDTO(updatedProduct);
    }

    public String deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with ID: " + id
                        ));

        productRepository.delete(product);

        return "Product deleted successfully";
    }

    private ProductResponseDTO mapToResponseDTO(Product product) {

        return new ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getDescription()
        );
    }
}