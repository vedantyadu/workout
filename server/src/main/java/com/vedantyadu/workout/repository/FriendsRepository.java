package com.vedantyadu.workout.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vedantyadu.workout.db.Friends;

public interface FriendsRepository extends JpaRepository<Friends, Long> {
    public List<Friends> findByUserId(String userId);
}
