package com.vedantyadu.workout.db.users;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;

import com.vedantyadu.workout.db.refreshTokens.RefreshTokens;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true)
    private String username;

    private String fullName;

    @Column(unique = true)
    private String googleId;

    @OneToMany(mappedBy = "user")
    private List<RefreshTokens> refreshTokens;

    public Users() {
    }

    public Users(String googleId) {
        this.googleId = googleId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getGoogleId() {
        return googleId;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

}
