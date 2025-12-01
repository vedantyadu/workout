package com.vedantyadu.workout.controller.friends;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vedantyadu.workout.db.friends.Friends;
import com.vedantyadu.workout.db.friends.FriendsRepository;

class FriendDTO {
    private String id;
    private String name;

    public FriendDTO(String id, String name) {
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

    @Autowired
    private FriendsRepository friendsRepository;

    @RequestMapping("/")
    public ResponseEntity<List<FriendDTO>> getFriendsList(@RequestAttribute("userId") String userId) {
        List<Friends> friends = friendsRepository.findByUserId(userId);
        List<FriendDTO> friendDTOs = friends.stream()
                .map(friend -> new FriendDTO(friend.getFriend().getId(), friend.getFriend().getFullName()))
                .toList();
        return ResponseEntity.ok(friendDTOs);
    }
}
