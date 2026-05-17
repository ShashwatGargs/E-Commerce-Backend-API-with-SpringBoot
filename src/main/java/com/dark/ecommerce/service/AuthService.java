package com.dark.ecommerce.service;

import com.dark.ecommerce.dto.LoginRequestDTO;
import com.dark.ecommerce.dto.RegisterRequestDTO;
import com.dark.ecommerce.entity.User;
import com.dark.ecommerce.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.dark.ecommerce.security.JwtService;
/*
  Service class responsible for authentication logic.
  Handles user registration, password encryption,
  login validation, and JWT token generation.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String register(RegisterRequestDTO dto) {

        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            return "Email already exists";
        }

        User user = new User();

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());

        String encodedPassword = passwordEncoder.encode(dto.getPassword());

        user.setPassword(encodedPassword);

        user.setRole("USER");

        userRepository.save(user);

        return "User registered successfully";
    }

    public String login(LoginRequestDTO dto) {

        User user = userRepository.findByEmail(dto.getEmail())
                .orElse(null);

        if (user == null) {
            return "Invalid email";
        }

        boolean passwordMatches = passwordEncoder.matches(
                dto.getPassword(),
                user.getPassword());

        if (!passwordMatches) {
            return "Invalid password";
        }

        return jwtService.generateToken(user.getEmail());
    }
}