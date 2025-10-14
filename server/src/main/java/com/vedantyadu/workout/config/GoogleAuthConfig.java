package com.vedantyadu.workout.config;

import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class GoogleAuthConfig {
    @Value("${googleoauth.clientId}")
    private String clientId;
    @Value("${googleoauth.clientSecret}")
    private String clientSecret;
    @Value("${frontend.url}")
    private String frontendURL;

    public String getGoogleToken(String code) throws IOException, InterruptedException {

        HashMap<String, String> params = new HashMap<>();
        params.put("client_id", this.clientId);
        params.put("client_secret", this.clientSecret);
        params.put("code", code);
        params.put("grant_type", "authorization_code");
        params.put("redirect_uri", this.frontendURL + "/login/redirect/google");

        ObjectMapper mapper = new ObjectMapper();
        String requestBody = mapper.writeValueAsString(params);

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(java.net.URI.create("https://oauth2.googleapis.com/token"))
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
        return response.body();
    }

    public String getGoogleUser(String tokenData) throws IOException, InterruptedException {

        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(tokenData);
        String accessToken = jsonNode.get("access_token").asText();

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(java.net.URI.create(
                        "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + accessToken))
                .build();

        HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
        return response.body();
    }
}
