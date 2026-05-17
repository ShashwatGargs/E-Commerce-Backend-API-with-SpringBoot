package com.dark.ecommerce.controller;

import com.dark.ecommerce.dto.ProductRequestDTO;
import com.dark.ecommerce.dto.ProductResponseDTO;
import com.dark.ecommerce.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
/*
  REST controller responsible for handling product-related APIs.
  Receives HTTP requests, delegates business logic to services,
  and returns responses to the client.
 */
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ProductResponseDTO addProduct(
            @Valid @RequestBody ProductRequestDTO dto
    ) {
        return productService.addProduct(dto);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping
    public List<ProductResponseDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/{id}")
    public ProductResponseDTO getProductById(
            @PathVariable Long id
    ) {
        return productService.getProductById(id);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ProductResponseDTO updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequestDTO dto
    ) {
        return productService.updateProduct(id, dto);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable Long id
    ) {
        return productService.deleteProduct(id);
    }
}