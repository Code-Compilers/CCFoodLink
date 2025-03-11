package com.example.foodwastemanagement;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Base64;
public class KeyGeneratorExample {
    public static void main(String[] args) throws Exception {
        KeyGenerator keyGenerator = KeyGenerator.getInstance("HmacSHA256");
        keyGenerator.init(256);  // 256-bit key
        SecretKey secretKey = keyGenerator.generateKey();
        String encodedKey = Base64.getEncoder().encodeToString(secretKey.getEncoded());
        System.out.println("Generated Secret Key: " + encodedKey);
    }
}

