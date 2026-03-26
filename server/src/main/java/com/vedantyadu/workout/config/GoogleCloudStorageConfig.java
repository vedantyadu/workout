package com.vedantyadu.workout.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

@Configuration
public class GoogleCloudStorageConfig {

    @Value("${gcp.project.id}")
    private String projectId;
    @Value("${gcp.storage.bucket.name}")
    private String bucketName;
    @Value("${gcp.storage.profile-picture.folder}")
    private String profilePictureFolder;
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

    public Resource getStorageAdminCredentialFilePath() {
        return storageAdminCredentialFilePath;
    }
}
