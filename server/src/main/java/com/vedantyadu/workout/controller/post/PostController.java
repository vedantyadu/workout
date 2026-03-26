package com.vedantyadu.workout.controller.post;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import com.google.genai.Client;
// import com.google.genai.types.GenerateContentResponse;

@RestController
@RequestMapping("/post")
public class PostController {

    @PostMapping("/create")
    public String createPost(
            @RequestBody PostDTO post) {
        // Client client = new Client();

        // GenerateContentResponse response =
        // client.models.generateContent("gemini-2.5-flash", "", null);

        return "Post created successfully";
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
