package com.vedantyadu.workout.controller.users;

import java.util.Optional;
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
import com.vedantyadu.workout.db.friendRequests.FriendRequests;
import com.vedantyadu.workout.db.friendRequests.FriendRequestsRepository;
import com.vedantyadu.workout.db.users.Users;
import com.vedantyadu.workout.db.users.UsersRepository;
import com.vedantyadu.workout.service.GoogleCloudStorageService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/users")
public class UsersController {

    private UsersRepository usersRepository;
    private FriendRequestsRepository friendRequestsRepository;
    private GoogleCloudStorageService googleCloudStorageService;

    public UsersController(UsersRepository usersRepository,
            FriendRequestsRepository friendRequestsRepository,
            GoogleCloudStorageService googleCloudStorageService) {
        this.usersRepository = usersRepository;
        this.friendRequestsRepository = friendRequestsRepository;
        this.googleCloudStorageService = googleCloudStorageService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUserDetails(@RequestAttribute("userId") String userId) {
        Optional<Users> user = usersRepository.findById(userId);

        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        UserDTO userDTO = new UserDTO(user.get());

        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfileDTO> getUserDetails(@PathVariable String id) {
        Optional<Users> user = usersRepository.findById(id);

        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        UserProfileDTO userProfileDTO = new UserProfileDTO(user.get());

        return ResponseEntity.ok(userProfileDTO);
    }

    @PostMapping("/{id}/friend-request")
    public ResponseEntity<String> sendFriendRequest(
            @PathVariable String id,
            @RequestAttribute("userId") String userId) {

        Users sender = usersRepository.getReferenceById(userId);
        Users receiver = usersRepository.getReferenceById(id);

        FriendRequests friendRequests = new FriendRequests(sender, receiver);
        friendRequestsRepository.save(friendRequests);

        return ResponseEntity.ok("Friend request sent to user with id: " + id);
    }

    @PostMapping(value = "/setup", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> completeSetup(
            HttpServletRequest request,
            @RequestPart(value = "profilePicture", required = false) MultipartFile profilePicture,
            @RequestPart("setupData") String setupRequest) {

        String userId = (String) request.getAttribute("userId");

        System.out.println("Received setup request for userId: " + userId);

        Users user = usersRepository.findById(userId).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        if (profilePicture != null && !profilePicture.isEmpty()) {
            try {
                String profilePictureUrl = googleCloudStorageService.uploadFile(profilePicture.getContentType(),
                        profilePicture.getBytes());
                user.setProfilePictureUrl(profilePictureUrl);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process the image");
            }
        }

        try {
            UserSetupRequestDTO userSetupRequest = new ObjectMapper().readValue(setupRequest,
                    UserSetupRequestDTO.class);
            user.setFullName(userSetupRequest.getFullName());
            user.setSetupComplete(true);
            usersRepository.save(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid setup data");
        }

        return ResponseEntity.ok("User setup completed");
    }
}

class UserDTO {
    private String id;
    private String name;
    private String googleId;
    private boolean setupComplete;

    public UserDTO(Users user) {
        this.id = user.getId();
        this.googleId = user.getGoogleId();
        this.name = user.getFullName();
        this.setupComplete = user.getSetupComplete();
    }

    public String getId() {
        return id;
    }

    public String getGoogleId() {
        return googleId;
    }

    public String getName() {
        return name;
    }

    public boolean getSetupComplete() {
        return setupComplete;
    }
}

class UserProfileDTO {
    private String id;
    private String name;

    public UserProfileDTO(Users user) {
        this.id = user.getId();
        this.name = user.getFullName();
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}

class UserSetupRequestDTO {
    private String fullName;

    public UserSetupRequestDTO() {
    }

    public UserSetupRequestDTO(String fullName) {
        this.fullName = fullName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
}
