package com.vedantyadu.workout.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vedantyadu.workout.db.Friends;

public interface FriendsRepository extends JpaRepository<Friends, UUID> {
    public List<Friends> findByUserId(UUID userId);
}
