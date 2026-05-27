package com.vedantyadu.workout.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.vedantyadu.workout.db.Posts;
import com.vedantyadu.workout.db.Users;

public interface PostsRepository extends JpaRepository<Posts, UUID> {
  List<Posts> findByAuthor(Users author);

  @Query("SELECT p from Posts p JOIN Follower f ON p.author.id = f.followingId")
  List<Posts> findByFollowed(Users user);
}
