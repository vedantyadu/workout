package com.vedantyadu.workout.db;

import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

import java.util.List;
import java.util.UUID;


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
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToMany
    private List<Users> sender;

    @ManyToMany
    private List<Users> receiver;

    @Enumerated(EnumType.STRING)
    private FriendRequestStatus status;

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public List<Users> getSender() {
        return sender;
    }

    public List<Users> getReceiver() {
        return receiver;
    }

    public FriendRequestStatus getStatus() {
        return status;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setSender(List<Users> sender) {
        this.sender = sender;
    }

    public void setReceiver(List<Users> receiver) {
        this.receiver = receiver;
    }

    public void setStatus(FriendRequestStatus status) {
        this.status = status;
    }

    public FriendRequests(Users sender, Users receiver) {
        this.sender = List.of(sender);
        this.receiver = List.of(receiver);
        this.status = FriendRequestStatus.PENDING;
    }
}