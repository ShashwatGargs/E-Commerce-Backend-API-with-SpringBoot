package com.dark.ecommerce.repository;

import com.dark.ecommerce.entity.Order;
import com.dark.ecommerce.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository
        extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findByOrder(Order order);

}