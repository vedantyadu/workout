package com.vedantyadu.workout.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vedantyadu.workout.db.FriendRequests;

public interface FriendRequestsRepository extends JpaRepository<FriendRequests, UUID> {

}
