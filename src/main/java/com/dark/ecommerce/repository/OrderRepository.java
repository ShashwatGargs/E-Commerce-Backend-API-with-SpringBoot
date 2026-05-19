package com.dark.ecommerce.repository;

import com.dark.ecommerce.entity.Order;
import com.dark.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,  Long> {

    List<Order> findByUser(User user);
    
}