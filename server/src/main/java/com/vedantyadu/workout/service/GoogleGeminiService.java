package com.vedantyadu.workout.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

@Service
public class GoogleGeminiService {

    private Client googleGeminiClient;

    public GoogleGeminiService(@Value("${google.gemini.apiKey}") String geminiAPIKey) {
        this.googleGeminiClient = Client.builder().apiKey(geminiAPIKey).build();
    }

    public String generateContent(String prompt) {
        GenerateContentResponse response = googleGeminiClient.models.generateContent("gemini-2.5-flash-lite", prompt,
                null);
        return response.text();
    }
}
