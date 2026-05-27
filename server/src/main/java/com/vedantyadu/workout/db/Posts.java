package com.vedantyadu.workout.db;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Posts {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private Long id;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @ManyToOne
  @JoinColumn(name = "author")
  private Users author;

  @Column(name = "post_type")
  private String postType;

  @Column(name = "content")
  private String content;

  @Column(name = "media_url")
  private String mediaUrl;
}
