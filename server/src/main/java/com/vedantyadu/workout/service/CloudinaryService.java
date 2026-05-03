package com.vedantyadu.workout.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.EagerTransformation;
import com.cloudinary.utils.ObjectUtils;

import io.github.cdimascio.dotenv.Dotenv;

@Service
public class CloudinaryService {
    private Cloudinary cloudinary;

    public CloudinaryService() {
        Dotenv dotenv = Dotenv.load();
        this.cloudinary = new Cloudinary(dotenv.get("CLOUDINARY_URL"));
    }

    public Map uploadFile(MultipartFile file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "unique_filename", true,
                "folder", "/workout/profile-pictures",
                "eager", Arrays.asList(
                        new EagerTransformation().width(800).height(800))));
        return uploadResult;
    }
}
