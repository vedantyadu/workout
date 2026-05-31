package com.vedantyadu.workout.dto;

import com.vedantyadu.workout.db.Users;

public class UsersDTO {
  public static class MeResponse {

    private String id;
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

    public String getId() {
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
    private String id;
    private String name;
    private String profilePictureUrl;

    public UserResponse(Users user) {
      this.id = user.getId();
      this.name = user.getFullName();
      this.profilePictureUrl = user.getProfilePictureURL();
    }

    public String getId() {
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
    public String fullName;
    public Float weight;
    public Float height;
    public Integer age;
    public String gender;

    public UserSetupRequest() {
    }

    public UserSetupRequest(String fullName, Float weight, Float height, Integer age, String gender) {
      this.fullName = fullName;
      this.weight = weight;
      this.height = height;
      this.age = age;
      this.gender = gender;
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

    public Integer getAge() {
      return age;
    }

    public String getGender() {
      return gender;
    }
  }
}
