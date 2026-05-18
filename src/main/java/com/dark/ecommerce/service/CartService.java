package com.dark.ecommerce.service;

import com.dark.ecommerce.dto.CartItemDTO;
import com.dark.ecommerce.entity.CartItem;
import com.dark.ecommerce.entity.Product;
import com.dark.ecommerce.entity.User;
import com.dark.ecommerce.repository.CartItemRepository;
import com.dark.ecommerce.repository.ProductRepository;
import com.dark.ecommerce.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartItemRepository cartItemRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    public CartService(
            CartItemRepository cartItemRepository,
            ProductRepository productRepository,
            UserRepository userRepository
    ) {
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public String addToCart(
            CartItemDTO dto,
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        Product product = productRepository
                .findById(dto.getProductId())
                .orElseThrow();

        CartItem cartItem = new CartItem();

        cartItem.setUser(user);
        cartItem.setProduct(product);
        cartItem.setQuantity(dto.getQuantity());

        cartItemRepository.save(cartItem);

        return "Product added to cart";
    }

    public List<CartItem> getCart(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        return cartItemRepository.findByUser(user);
    }

    public String removeFromCart(Long cartItemId) {

        cartItemRepository.deleteById(cartItemId);

        return "Item removed from cart";
    }
}