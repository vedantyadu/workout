package com.vedantyadu.workout.controller.friends;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vedantyadu.workout.db.Friends;
import com.vedantyadu.workout.repository.FriendsRepository;

class FriendsDTO {
    private String id;
    private String name;

    public FriendsDTO(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}

@RestController
@RequestMapping("/friends")
public class FriendsController {

    private FriendsRepository friendsRepository;

    public FriendsController(FriendsRepository friendsRepository) {
        this.friendsRepository = friendsRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<FriendsDTO>> getFriendsList(@RequestAttribute("userId") String userId) {
        List<Friends> friends = friendsRepository.findByUserId(userId);
        List<FriendsDTO> friendsDTOs = friends.stream()
                .map(friend -> new FriendsDTO(friend.getFriend().getId(), friend.getFriend().getFullName()))
                .toList();
        return ResponseEntity.ok(friendsDTOs);
    }
}
