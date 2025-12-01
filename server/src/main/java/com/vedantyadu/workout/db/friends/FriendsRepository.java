package com.vedantyadu.workout.db.friends;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendsRepository extends JpaRepository<Friends, Long> {
    public List<Friends> findByUserId(String userId);
}
