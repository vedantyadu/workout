package com.vedantyadu.workout.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vedantyadu.workout.db.Posts;
import com.vedantyadu.workout.db.Users;

public interface PostsRepository extends JpaRepository<Posts, UUID> {
  List<Posts> findByAuthor(Users author);

  @Query("SELECT p FROM Posts p JOIN Friends f WHERE p.author = f.friend AND f.user = :user ORDER BY p.createdAt DESC LIMIT 20 OFFSET :offset")
  List<Posts> findByUserFriends(@Param("user") Users user, @Param("offset") int offset);
}
