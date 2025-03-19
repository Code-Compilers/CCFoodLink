package com.example.foodwastemanagement.controller;

import com.example.foodwastemanagement.service.AuthService;
import com.example.foodwastemanagement.dto.AuthRequest;
import com.example.foodwastemanagement.dto.AuthResponse;
import com.example.foodwastemanagement.model.User;
import com.example.foodwastemanagement.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
class UserAuth {
    private final AuthService authService;

    public UserAuth(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        return authService.login(request);
    }
}
