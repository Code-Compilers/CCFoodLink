package com.example.foodwastemanagement.dto;


public class AuthRequest {
    private String email;
    private String password;

    //constructor
    public AuthRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    //setters and getters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}