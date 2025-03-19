package com.example.foodwastemanagement;

import io.jsonwebtoken.security.Keys;
import java.util.Base64;
import javax.crypto.SecretKey;

public class JwtKeyGenerator {
    public static void main(String[] args) {
        SecretKey key = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS512);
        String encodedKey = Base64.getEncoder().encodeToString(key.getEncoded());
        System.out.println("Generated Secure Key: " + encodedKey);
    }
}
