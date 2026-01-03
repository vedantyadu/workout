package com.vedantyadu.workout.controller.auth;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vedantyadu.workout.config.AuthConfig;
import com.vedantyadu.workout.config.GoogleAuthConfig;
import com.vedantyadu.workout.db.users.Users;
import com.vedantyadu.workout.db.users.UsersRepository;

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
@RequestMapping("/oauth")
public class AuthController {

    @Autowired
    private GoogleAuthConfig googleAuthConfig;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private AuthConfig authConfig;

    @PostMapping("/google")
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

            AuthDTO authDTO = new AuthDTO(accessToken, refreshToken);

            return ResponseEntity.ok()
                    .body(authDTO);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }
}
