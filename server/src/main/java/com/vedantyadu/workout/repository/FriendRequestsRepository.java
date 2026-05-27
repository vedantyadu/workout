package com.vedantyadu.workout.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vedantyadu.workout.db.FriendRequests;

public interface FriendRequestsRepository extends JpaRepository<FriendRequests, Long> {

}
