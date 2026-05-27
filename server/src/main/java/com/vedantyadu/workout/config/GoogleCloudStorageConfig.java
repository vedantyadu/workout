package com.vedantyadu.workout.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import org.springframework.beans.factory.annotation.Value;
import com.vedantyadu.workout.utils.enums.StorageFolder;

@Configuration
public class GoogleCloudStorageConfig {

  @Value("${gcp.project.id}")
  private String projectId;
  @Value("${gcp.storage.bucket.name}")
  private String bucketName;
  @Value("${gcp.storage.folder.profile.pictures}")
  private String profilePictureFolder;
  @Value("${gcp.storage.folder.posts}")
  private String postsFolder;
  @Value("${gcp.credentials.storage-admin.credential-file-path}")
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
