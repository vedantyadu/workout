package com.vedantyadu.workout.controller.post;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vedantyadu.workout.service.GoogleGeminiService;

@RestController
@RequestMapping("/post")
public class PostController {

    private GoogleGeminiService googleGeminiService;

    public PostController(GoogleGeminiService googleGeminiService) {
        this.googleGeminiService = googleGeminiService;
    }

    @PostMapping("/create")
    public String createPost(
            @RequestBody PostDTO post) {

        String geminiResponse = googleGeminiService.generateContent("Say hello world!");

        return geminiResponse;
    }
}

class PostDTO {
    private String type;
    private String content;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
