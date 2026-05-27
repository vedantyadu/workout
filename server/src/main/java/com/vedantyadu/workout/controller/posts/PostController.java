package com.vedantyadu.workout.controller.posts;

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
            @RequestBody PostRequestDTO post) {

        String geminiResponse = googleGeminiService.generateContent("Say hello world!");

        return geminiResponse;
    }
}

enum PostType {
    ACTIVITY,
    UPDATE
}

class UpdatePostContent {
    private String description;
    private String location;

    public UpdatePostContent(String description, String location) {
        this.description = description;
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}

class ActivityPostContent {
    private String activityType;
    private String description;
    private String duration;
    private String location;

    public ActivityPostContent(String activityType, String description, String duration, String location) {
        this.activityType = activityType;
        this.description = description;
        this.duration = duration;
        this.location = location;
    }

    public String getActivityType() {
        return activityType;
    }

    public void setActivityType(String activityType) {
        this.activityType = activityType;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}

class PostRequestDTO {
    private PostType type;
    private String content;

    public PostRequestDTO(PostType type, String content) {
        this.type = type;
        this.content = content;
    }

    public PostType getType() {
        return type;
    }

    public void setType(PostType type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
