package com.vedantyadu.workout.controller.friends;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vedantyadu.workout.db.Friends;
import com.vedantyadu.workout.repository.FriendsRepository;

class FriendsDTO {
    private UUID id;
    private String name;

    public FriendsDTO(UUID id, String name) {
        this.id = id;
        this.name = name;
    }

    public UUID getId() {
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
    public ResponseEntity<List<FriendsDTO>> getFriendsList(@RequestAttribute("userId") UUID userId) {
        List<Friends> friends = friendsRepository.findByUserId(userId);
        List<FriendsDTO> friendsDTOs = friends.stream()
                .map(friend -> new FriendsDTO(friend.getFriend().getId(), friend.getFriend().getUsername()))
                .toList();
        return ResponseEntity.ok(friendsDTOs);
    }
}
