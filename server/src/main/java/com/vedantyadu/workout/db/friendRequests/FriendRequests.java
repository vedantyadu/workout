package com.vedantyadu.workout.db.friendRequests;

import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

import com.vedantyadu.workout.db.users.Users;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

enum FriendRequestStatus {
    PENDING,
    ACCEPTED,
    REJECTED
}

@Entity
public class FriendRequests {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    private Users sender;

    @ManyToMany
    private Users receiver;

    @Enumerated(EnumType.STRING)
    private FriendRequestStatus status;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public Users getSender() {
        return sender;
    }

    public Users getReceiver() {
        return receiver;
    }

    public FriendRequestStatus getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setSender(Users sender) {
        this.sender = sender;
    }

    public void setReceiver(Users receiver) {
        this.receiver = receiver;
    }

    public void setStatus(FriendRequestStatus status) {
        this.status = status;
    }

    public FriendRequests(Users sender, Users receiver) {
        this.sender = sender;
        this.receiver = receiver;
        this.status = FriendRequestStatus.PENDING;
    }
}