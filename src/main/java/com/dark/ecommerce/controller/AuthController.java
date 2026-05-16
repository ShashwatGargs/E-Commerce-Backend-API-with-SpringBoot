package com.dark.ecommerce.controller;

import com.dark.ecommerce.dto.LoginRequestDTO;
import com.dark.ecommerce.dto.RegisterRequestDTO;
import com.dark.ecommerce.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(
            @RequestBody RegisterRequestDTO dto
    ) {

        return authService.register(dto);
    }

    @PostMapping("/login")
    public String login(
            @RequestBody LoginRequestDTO dto
    ) {

        return authService.login(dto);
    }
}