package com.dark.ecommerce.repository;

import com.dark.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
/*
  Repository interface for User entity.
  Provides database operations for users and custom query
  methods such as finding users by email.
 */
public interface UserRepository
        extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}