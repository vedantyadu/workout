package com.vedantyadu.workout.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vedantyadu.workout.db.Users;

public interface UsersRepository extends JpaRepository<Users, UUID> {

    boolean existsByGoogleId(String googleId);

    Users findByGoogleId(String googleId);

    Optional<Users> findByUsername(String username);
}