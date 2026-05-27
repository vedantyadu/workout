package com.vedantyadu.workout.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vedantyadu.workout.db.Users;

public interface UsersRepository extends JpaRepository<Users, String> {

    boolean existsByGoogleId(String googleId);

    Users findByGoogleId(String googleId);
}