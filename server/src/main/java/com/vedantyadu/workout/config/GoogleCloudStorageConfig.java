package com.vedantyadu.workout.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import org.springframework.beans.factory.annotation.Value;
import com.vedantyadu.workout.utils.Enums.StorageFolder;;

@Configuration
public class GoogleCloudStorageConfig {

  @Value("${google.cloud.project.id}")
  private String projectId;
  @Value("${google.cloud.storage.bucket.name}")
  private String bucketName;
  @Value("${google.cloud.storage.folder.profile-pictures}")
  private String profilePictureFolder;
  @Value("${google.cloud.storage.folder.posts}")
  private String postsFolder;
  @Value("${google.cloud.credentials.storage-admin.credential-file-path}")
  private Resource storageAdminCredentialFilePath;

  public GoogleCloudStorageConfig() {
  }

  public String getProjectId() {
    return projectId;
  }

  public String getBucketName() {
    return bucketName;
  }

  public String getProfilePictureFolder() {
    return profilePictureFolder;
  }

  public String getPostsFolder() {
    return postsFolder;
  }

  public Resource getStorageAdminCredentialFilePath() {
    return storageAdminCredentialFilePath;
  }

  public String getFolderName(StorageFolder folder) {
    return switch (folder) {
      case PROFILE_PICTURE -> profilePictureFolder;
      case POSTS -> postsFolder;
    };
  }
}
