package com.example.foodwastemanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AuthResponse {
    private String token;

    //constructor
    public AuthResponse(String token){
        this.token = token;
    }
    //getters and setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}