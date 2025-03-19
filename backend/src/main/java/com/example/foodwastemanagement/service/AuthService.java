package com.example.foodwastemanagement.service;

import com.example.foodwastemanagement.dto.AuthRequest;
import com.example.foodwastemanagement.dto.AuthResponse;
import com.example.foodwastemanagement.model.User;
import com.example.foodwastemanagement.util.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final com.example.foodwastemanagement.repository.UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(com.example.foodwastemanagement.repository.UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public String register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already registered!";
        }
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        userRepository.save(user);
        return "User registered successfully!";
    }

    public AuthResponse login(AuthRequest request) {
        System.out.println("Attempting to login with email: " + request.getEmail());
        System.out.println("AuthRequest: " + request.getPassword());


        if (request.getPassword() == null || request.getPassword().isEmpty()){
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("Stored Hash: " + user.getPasswordHash());

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        System.out.println("Generated token: " + token);
        return new AuthResponse(token);
    }
}
