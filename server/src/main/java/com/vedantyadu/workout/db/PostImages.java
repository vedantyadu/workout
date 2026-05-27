package com.vedantyadu.workout.db;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class PostImages {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private Long id;

  @Column(name = "post_id")
  private Long postId;

  @Column(name = "image_url")
  private String imageUrl;
}
