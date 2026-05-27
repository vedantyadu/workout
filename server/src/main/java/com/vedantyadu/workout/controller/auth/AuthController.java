package com.vedantyadu.workout.controller.auth;

import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vedantyadu.workout.config.AuthConfig;
import com.vedantyadu.workout.config.GoogleAuthConfig;
import com.vedantyadu.workout.db.RefreshTokens;
import com.vedantyadu.workout.repository.RefreshTokensRepository;
import com.vedantyadu.workout.db.Users;
import com.vedantyadu.workout.repository.UsersRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

class AuthDTO {
    private String accessToken;
    private String refreshToken;

    public AuthDTO(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}

@RestController
@RequestMapping("/auth")
public class AuthController {

    private GoogleAuthConfig googleAuthConfig;
    private UsersRepository usersRepository;
    private RefreshTokensRepository refreshTokensRepository;
    private AuthConfig authConfig;

    public AuthController(GoogleAuthConfig googleAuthConfig, UsersRepository usersRepository,
            RefreshTokensRepository refreshTokensRepository, AuthConfig authConfig) {
        this.googleAuthConfig = googleAuthConfig;
        this.usersRepository = usersRepository;
        this.refreshTokensRepository = refreshTokensRepository;
        this.authConfig = authConfig;
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody HashMap<String, String> body) {
        try {
            String refreshToken = body.get("refreshToken");
            Jws<Claims> claims = authConfig.validateAndGetRefreshClaims(refreshToken);
            String userId = claims.getPayload().getSubject();

            RefreshTokens storedToken = refreshTokensRepository.findByToken(refreshToken);

            if (storedToken == null || !storedToken.getUser().getId().equals(userId)) {
                return ResponseEntity.status(401).body("Invalid refresh token");
            }

            String newAccessToken = authConfig.generateAccessToken(userId);
            String newRefreshToken = authConfig.generateRefreshToken(userId);

            RefreshTokens newRefreshTokenEntity = new RefreshTokens(storedToken.getUser(), newRefreshToken);

            refreshTokensRepository.save(newRefreshTokenEntity);
            refreshTokensRepository.delete(storedToken);

            AuthDTO response = new AuthDTO(newAccessToken, newRefreshToken);

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid refresh token");
        }
    }

    @PostMapping("/oauth/google")
    public ResponseEntity<?> googleAuth(@RequestBody HashMap<String, String> body) {
        try {
            String code = body.get("code");
            String tokenData = googleAuthConfig.getGoogleToken(code);
            String googleUser = googleAuthConfig.getGoogleUser(tokenData);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(googleUser);
            String googleId = root.get("id").asText();

            Boolean userExists = usersRepository.existsByGoogleId(googleId);
            Users matchedUser;

            if (!userExists) {
                Users newUser = new Users(googleId);
                matchedUser = usersRepository.save(newUser);
            } else {
                matchedUser = usersRepository.findByGoogleId(googleId);
            }

            String accessToken = authConfig.generateAccessToken(matchedUser.getId());
            String refreshToken = authConfig.generateRefreshToken(matchedUser.getId());

            RefreshTokens refreshTokenEntity = new RefreshTokens(matchedUser, refreshToken);
            refreshTokensRepository.save(refreshTokenEntity);

            AuthDTO authDTO = new AuthDTO(accessToken, refreshToken);

            return ResponseEntity.ok()
                    .body(authDTO);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }
}
