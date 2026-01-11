package com.vedantyadu.workout.config;

import java.security.Key;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class AuthConfig {
    @Value("${jwt.accessSecretKey}")
    private String jwtAccessSecretKey;
    @Value("${jwt.accessExpirationMs}")
    private Integer jwtAccessExpirationMs;
    @Value("${jwt.refreshSecretKey}")
    private String jwtRefreshSecretKey;
    @Value("${jwt.refreshExpirationMs}")
    private Integer jwtRefreshExpirationMs;

    public String generateAccessToken(String userId) {
        return Jwts.builder()
                .subject(userId)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + this.jwtAccessExpirationMs))
                .signWith(this.getSigningKey(this.jwtAccessSecretKey))
                .compact();
    }

    public String generateRefreshToken(String userId) {
        return Jwts.builder()
                .subject(userId)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + this.jwtRefreshExpirationMs))
                .signWith(this.getSigningKey(this.jwtRefreshSecretKey))
                .compact();
    }

    public Jws<Claims> validateAndGetClaims(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) this.getSigningKey(this.jwtAccessSecretKey))
                .build()
                .parseSignedClaims(token);
    }

    public Jws<Claims> validateAndGetRefreshClaims(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) this.getSigningKey(this.jwtRefreshSecretKey))
                .build()
                .parseSignedClaims(token);
    }

    private Key getSigningKey(String secret) {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
}
