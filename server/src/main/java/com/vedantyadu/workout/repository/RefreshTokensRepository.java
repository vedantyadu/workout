package com.vedantyadu.workout.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vedantyadu.workout.db.RefreshTokens;
import com.vedantyadu.workout.db.Users;

public interface RefreshTokensRepository extends JpaRepository<RefreshTokens, Long> {
    List<RefreshTokens> findByUserId(Users userId);

    RefreshTokens findByToken(String token);
}
