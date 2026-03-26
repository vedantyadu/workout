package com.vedantyadu.workout.service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Acl;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.vedantyadu.workout.config.GoogleCloudStorageConfig;

@Service
public class GoogleCloudStorageService {

    private Storage storage;
    private GoogleCloudStorageConfig config;

    public GoogleCloudStorageService(
            GoogleCloudStorageConfig config) throws IOException {
        this.config = config;
        GoogleCredentials credentials = GoogleCredentials
                .fromStream(config.getStorageAdminCredentialFilePath().getInputStream());
        this.storage = StorageOptions.newBuilder().setProjectId(config.getProjectId()).setCredentials(credentials)
                .build().getService();
    }

    public String uploadFile(String contentType, byte[] content) {
        UUID uuid = UUID.randomUUID();
        String uuidString = uuid.toString();

        BlobId blobId = BlobId.of(config.getBucketName(), config.getProfilePictureFolder() + "/" + uuidString);
        BlobInfo blobInfo = BlobInfo
                .newBuilder(blobId)
                .setContentType(contentType)
                .setAcl(List.of(
                        Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER)))
                .build();
        this.storage.create(blobInfo, content);

        return uuidString;
    }
}
