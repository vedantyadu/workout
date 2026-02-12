package com.vedantyadu.workout.service;

import java.io.File;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class AWSS3Service {
    private S3Client s3Client;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    public AWSS3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadFile(File file) {

        UUID uuid = UUID.randomUUID();
        String uuidAsString = uuid.toString();

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(uuidAsString)
                .build();

        s3Client.putObject(putObjectRequest, file.toPath());

        return uuidAsString;
    }
}
