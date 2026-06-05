package com.dark.ecommerce.dto;

public class LoginResponseDTO {

    private String token;
    private String role;
    private String message;

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(
            String token,
            String role,
            String message) {
        this.token = token;
        this.role = role;
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public String getRole() {
        return role;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setRole(String role) {
        this.role = role;
    }
}