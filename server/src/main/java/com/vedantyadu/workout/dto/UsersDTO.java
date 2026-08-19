package com.vedantyadu.workout.dto;

import java.util.UUID;

import com.vedantyadu.workout.db.Users;

public class UsersDTO {
  public static class MeResponse {

    private UUID id;
    private String name;
    private String googleId;
    private boolean setupComplete;
    private String profilePictureUrl;

    public MeResponse(Users user) {
      this.id = user.getId();
      this.googleId = user.getGoogleId();
      this.name = user.getFullName();
      this.setupComplete = user.getSetupComplete();
      this.profilePictureUrl = user.getProfilePictureURL();
    }

    public UUID getId() {
      return id;
    }

    public String getGoogleId() {
      return googleId;
    }

    public String getName() {
      return name;
    }

    public boolean getSetupComplete() {
      return setupComplete;
    }

    public String getProfilePictureUrl() {
      return profilePictureUrl;
    }
  }

  public static class UserResponse {
    private UUID id;
    private String name;
    private String profilePictureUrl;

    public UserResponse(Users user) {
      this.id = user.getId();
      this.name = user.getFullName();
      this.profilePictureUrl = user.getProfilePictureURL();
    }

    public UUID getId() {
      return id;
    }

    public String getName() {
      return name;
    }

    public String getProfilePictureUrl() {
      return profilePictureUrl;
    }
  }

  public static class UserSetupRequest {
    public String username;
    public String fullName;
    public Float weight;
    public Float height;

    public UserSetupRequest() {
    }

    public UserSetupRequest(String username, String fullName, Float weight, Float height) {
      this.username = username;
      this.fullName = fullName;
      this.weight = weight;
      this.height = height;
    }

    public String getUsername() {
      return username;
    }

    public String getFullName() {
      return fullName;
    }

    public Float getWeight() {
      return weight;
    }

    public Float getHeight() {
      return height;
    }

  }
}
