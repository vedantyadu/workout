package com.vedantyadu.workout.db;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Subscriptions {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @JoinColumn
  @ManyToOne
  private Users user;

  @Column
  private Date validTill;

  @Column
  private Float chargedAmount;

  @CreationTimestamp
  private Timestamp createdAt;

  public Subscriptions() {
  }

  public Subscriptions(Users user, Date validTill, Float chargedAmount) {
    this.user = user;
    this.validTill = validTill;
    this.chargedAmount = chargedAmount;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public Users getUser() {
    return user;
  }

  public void setUser(Users user) {
    this.user = user;
  }

  public Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Timestamp createdAt) {
    this.createdAt = createdAt;
  }

  public Date getValidTill() {
    return validTill;
  }

  public void setValidTill(Date validTill) {
    this.validTill = validTill;
  }
}
