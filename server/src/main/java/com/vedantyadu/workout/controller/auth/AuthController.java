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

            ResponseCookie accessCookie = ResponseCookie.from("access_token", accessToken)
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge(60 * 15)
                    .sameSite("Strict")
                    .build();

            ResponseCookie refreshCookie = ResponseCookie.from("refresh_token", refreshToken)
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge(7 * 24 * 60 * 60)
                    .sameSite("Strict")
                    .build();

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.SET_COOKIE, accessCookie.toString());
            headers.add(HttpHeaders.SET_COOKIE, refreshCookie.toString());

            return ResponseEntity.ok().headers(headers).body("Authentication Successful");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }
}
