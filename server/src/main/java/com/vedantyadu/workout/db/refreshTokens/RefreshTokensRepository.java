package com.vedantyadu.workout.db.refreshTokens;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vedantyadu.workout.db.users.Users;

public interface RefreshTokensRepository extends JpaRepository<RefreshTokens, Long> {
    List<RefreshTokens> findByUserId(Users userId);

    RefreshTokens findByToken(String token);
}
