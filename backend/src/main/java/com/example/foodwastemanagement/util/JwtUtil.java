package com.example.foodwastemanagement.util;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
<<<<<<< HEAD

<<<<<<< HEAD
=======
import javax.crypto.SecretKey;
=======
import java.util.Base64;
>>>>>>> Bokang
>>>>>>> 01146cd8acf8a702ae68ab5e383d89dfb8d1eb5e
import java.util.Date;

@Component
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    private static final Dotenv dotenv = Dotenv.load();

    private final String secret;
    private final long expiration;

    public JwtUtil() {
        // Load JWT secret key from .env file
        this.secret = dotenv.get("JWT_SECRET_KEY");
        if (this.secret == null || this.secret.isEmpty()) {
            throw new IllegalStateException("JWT_SECRET_KEY is not set in the .env file.");
        }

        // Load JWT expiration time from .env file (default to 1 hour)
        String expirationMs = dotenv.get("JWT_EXPIRATION_MS", "3600000"); // Default to 1 hour
        long parsedExpiration;
        try {
            parsedExpiration = Long.parseLong(expirationMs);
        } catch (NumberFormatException e) {
            logger.error("Invalid JWT_EXPIRATION_MS value in .env file. Using default value (1 hour).");
            parsedExpiration = 3600000; // Default to 1 hour
        }
        this.expiration = parsedExpiration; // Final assignment
    }

    public String generateToken(String email) {
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty.");
        }

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public String extractUsername(String token) {
        if (token == null || token.isEmpty()) {
            throw new IllegalArgumentException("Token cannot be null or empty.");
        }

        try {
            return getClaims(token).getSubject();
        } catch (Exception e) {
            logger.error("Failed to extract username from token: {}", e.getMessage(), e);
            throw new RuntimeException("Invalid token.", e);
        }
    }

    public boolean validateToken(String token, String email) {
        if (token == null || token.isEmpty() || email == null || email.isEmpty()) {
            return false;
        }

        try {
            String tokenEmail = extractUsername(token);
            return (email.equals(tokenEmail) && !isTokenExpired(token));
        } catch (Exception e) {
            logger.error("Token validation failed: {}", e.getMessage(), e);
            return false;
        }
    }

    private Claims getClaims(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            logger.error("Failed to parse JWT claims: {}", e.getMessage(), e);
            throw new RuntimeException("Invalid token.", e);
        }
    }

    private boolean isTokenExpired(String token) {
        try {
            return getClaims(token).getExpiration().before(new Date());
        } catch (Exception e) {
            logger.error("Failed to check token expiration: {}", e.getMessage(), e);
            return true; // Assume expired if there's an error
        }
    }
}
