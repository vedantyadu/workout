package com.vedantyadu.workout.controller.users;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vedantyadu.workout.db.friendRequests.FriendRequests;
import com.vedantyadu.workout.db.friendRequests.FriendRequestsRepository;
import com.vedantyadu.workout.db.friends.FriendsRepository;
import com.vedantyadu.workout.db.users.Users;
import com.vedantyadu.workout.db.users.UsersRepository;

class UserDTO {
    private String id;
    private String name;

    public UserDTO(Users user) {
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

@RestController
@RequestMapping("/users/{id}")
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private FriendRequestsRepository friendRequestsRepository;

    @GetMapping("/")
    public ResponseEntity<UserDTO> getUserDetails(@PathVariable String id) {
        Optional<Users> user = usersRepository.findById(id);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        UserDTO userDTO = new UserDTO(user.get());
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/friend-request")
    public ResponseEntity<String> sendFriendRequest(@PathVariable String id,
            @RequestAttribute("userId") String userId) {

        Users sender = usersRepository.getReferenceById(userId);
        Users receiver = usersRepository.getReferenceById(id);

        FriendRequests friendRequests = new FriendRequests(sender, receiver);
        friendRequestsRepository.save(friendRequests);

        return ResponseEntity.ok("Friend request sent to user with id: " + id);
    }
}
