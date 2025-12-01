package com.vedantyadu.workout.db.users;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, String> {

    boolean existsByGoogleId(String googleId);

    Users findByGoogleId(String googleId);
}