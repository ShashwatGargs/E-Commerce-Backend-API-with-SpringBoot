package com.dark.ecommerce.service;

import com.dark.ecommerce.dto.ProductRequestDTO;
import com.dark.ecommerce.dto.ProductResponseDTO;
import com.dark.ecommerce.entity.Product;
import com.dark.ecommerce.exception.ProductNotFoundException;
import com.dark.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

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
        product.setCategory(dto.getCategory());
        product.setImageUrl(dto.getImageUrl());
        product.setActive(true);

        Product savedProduct = productRepository.save(product);

        return mapToResponseDTO(savedProduct);
    }

    public List<ProductResponseDTO> getAllProducts() {

        return productRepository.findByActiveTrue()
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    public List<ProductResponseDTO> getArchivedProducts() {

        return productRepository.findByActiveFalse()
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    public String restoreProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(
                        "Product not found"));

        product.setActive(true);

        productRepository.save(product);

        return "Product restored";
    }

    public ProductResponseDTO getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(
                        "Product not found"));

        if (!product.isActive()) {
            throw new ProductNotFoundException(
                    "Product not found");
        }

        return mapToResponseDTO(product);
    }

    public ProductResponseDTO updateProduct(
            Long id,
            ProductRequestDTO dto) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(
                        "Product not found with ID: " + id));

        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setDescription(dto.getDescription());
        product.setCategory(dto.getCategory());
        product.setImageUrl(dto.getImageUrl());

        Product updatedProduct = productRepository.save(product);

        return mapToResponseDTO(updatedProduct);
    }

    public String deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(
                        "Product not found with ID: " + id));

        product.setActive(false);

        productRepository.save(product);

        return "Product archived successfully";
    }

    private ProductResponseDTO mapToResponseDTO(Product product) {

        return new ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getCategory(),
                product.getDescription(),
                product.getImageUrl());
    }

    // For Pagination (Search + Pagination)
    public Page<Product> searchProducts(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByNameContainingIgnoreCase(keyword, pageable);
    }

    // For Pagination Only
    public Page<Product> getProductPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
    }
}