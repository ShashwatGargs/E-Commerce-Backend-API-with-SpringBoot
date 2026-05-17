package com.dark.ecommerce.dto;

/*
  DTO used for user registration requests.
  Carries user signup data such as name,
  email, and password from client to backend.
 */
public class RegisterRequestDTO {

    private String name;
    private String email;
    private String password;

    public RegisterRequestDTO() {
    }

    public RegisterRequestDTO(
            String name,
            String email,
            String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}