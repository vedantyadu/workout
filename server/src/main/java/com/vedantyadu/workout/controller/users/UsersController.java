package com.vedantyadu.workout.controller.users;

import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vedantyadu.workout.db.FriendRequests;
import com.vedantyadu.workout.repository.FriendRequestsRepository;
import com.vedantyadu.workout.db.Users;
import com.vedantyadu.workout.dto.UsersDTO.MeResponse;
import com.vedantyadu.workout.dto.UsersDTO.UserResponse;
import com.vedantyadu.workout.dto.UsersDTO.UserSetupRequest;
import com.vedantyadu.workout.repository.UsersRepository;
import com.vedantyadu.workout.service.GoogleCloudStorageService;
import com.vedantyadu.workout.utils.Enums.StorageFolder;
import com.vedantyadu.workout.utils.image.AspectRatio;
import com.vedantyadu.workout.utils.image.ImagePipeline;

@RestController
@RequestMapping("/users")
public class UsersController {

    private UsersRepository usersRepository;
    private FriendRequestsRepository friendRequestsRepository;
    private GoogleCloudStorageService googleCloudStorageService;
    private ImagePipeline imagePipeline;

    public UsersController(UsersRepository usersRepository,
            FriendRequestsRepository friendRequestsRepository,
            GoogleCloudStorageService googleCloudStorageService) {
        this.usersRepository = usersRepository;
        this.friendRequestsRepository = friendRequestsRepository;
        this.googleCloudStorageService = googleCloudStorageService;
        this.imagePipeline = new ImagePipeline(800 * 800, 90, new AspectRatio(1, 1));
    }

    @GetMapping("/me")
    public ResponseEntity<MeResponse> getCurrentUserDetails(@RequestAttribute("userId") UUID userId) {
        Optional<Users> user = usersRepository.findById(userId);

        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        MeResponse meResponse = new MeResponse(user.get());

        return ResponseEntity.ok(meResponse);
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserResponse> getUserDetails(@PathVariable String username) {
        Optional<Users> user = usersRepository.findByUsername(username);

        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        UserResponse userResponse = new UserResponse(user.get());

        return ResponseEntity.ok(userResponse);
    }

    @PostMapping("/{username}/friend-request")
    public ResponseEntity<String> sendFriendRequest(
            @PathVariable String username,
            @RequestAttribute("userId") UUID userId) {

        Users sender = usersRepository.getReferenceById(userId);
        Optional<Users> receiver = usersRepository.findByUsername(username);

        if (receiver.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        if (receiver.get().getId().equals(userId)) {
            return ResponseEntity.badRequest().body("You cannot send a friend request to yourself");
        }

        FriendRequests friendRequests = new FriendRequests(sender, receiver.get());
        friendRequestsRepository.save(friendRequests);

        return ResponseEntity.ok("Friend request sent to: " + username);
    }

    @PostMapping(value = "/setup", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> completeSetup(
            @RequestAttribute("userId") UUID userId,
            @RequestPart(value = "profilePicture", required = false) MultipartFile profilePicture,
            @RequestPart("setupData") String setupRequest) {

        Users user = usersRepository.findById(userId).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        if (profilePicture != null && !profilePicture.isEmpty()) {
            try {
                byte[] processedImage = imagePipeline.processImage(profilePicture);
                String imageUrl = googleCloudStorageService.uploadFile(
                        "image/" + imagePipeline.getFormat(),
                        processedImage, StorageFolder.PROFILE_PICTURE);
                user.setProfilePictureURL(imageUrl);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process the image");
            }
        }

        try {
            UserSetupRequest userSetupData = new ObjectMapper().readValue(setupRequest,
                    UserSetupRequest.class);
            user.setUsername(userSetupData.getUsername());
            user.setFullName(userSetupData.getFullName());
            user.setHeight(userSetupData.getHeight());
            user.setWeight(userSetupData.getWeight());
            user.setSetupComplete(true);
            usersRepository.save(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid setup data");
        }

        return ResponseEntity.ok("User setup completed");
    }
}
