package com.vedantyadu.workout.utils.image;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;

import org.springframework.web.multipart.MultipartFile;

public class ImagePipeline {

  private int totalPixels;
  private int quality;
  private AspectRatio aspectRatio;

  public ImagePipeline(int totalPixels, int quality, AspectRatio aspectRatio) {
    this.totalPixels = totalPixels;
    this.quality = quality;
    this.aspectRatio = aspectRatio;
  }

  public ImagePipeline(int totalPixels, int quality) {
    this.totalPixels = totalPixels;
    this.quality = quality;
  }

  private BufferedImage cropImage(BufferedImage bufferedImage) {
    if (aspectRatio == null) {
      return bufferedImage;
    }

    int originalWidth = bufferedImage.getWidth();
    int originalHeight = bufferedImage.getHeight();

    int targetWidth = (int) (originalWidth * aspectRatio.getHorizontal());
    int targetHeight = (int) (originalHeight * aspectRatio.getVertical());

    return bufferedImage.getSubimage((originalWidth - targetWidth) / 2,
        (originalHeight - targetHeight) / 2,
        targetWidth, targetHeight);
  }

  private BufferedImage resizeImage(BufferedImage bufferedImage) {

    int height = bufferedImage.getHeight();
    int width = bufferedImage.getWidth();

    if (width * height <= totalPixels) {
      return bufferedImage;
    }

    int newHeight = (int) (totalPixels * aspectRatio.getVertical() / aspectRatio.getHorizontal());
    int newWidth = (int) (totalPixels / newHeight);

    BufferedImage resizedImage = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_RGB);
    Graphics2D g2d = resizedImage.createGraphics();
    g2d.drawImage(bufferedImage, 0, 0, newWidth, newHeight, null);
    g2d.dispose();

    return resizedImage;
  }

  private byte[] compressImage(BufferedImage bufferedImage) throws Exception {
    ImageWriter writer = ImageIO.getImageWritersByFormatName("jpeg").next();
    ImageWriteParam param = writer.getDefaultWriteParam();
    param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
    param.setCompressionQuality(quality / 100.0f);
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    writer.setOutput(outputStream);
    writer.write(null, new IIOImage(bufferedImage, null, null), param);
    return outputStream.toByteArray();
  }

  public byte[] processImage(MultipartFile file) throws Exception {
    BufferedImage image = ImageIO.read(file.getInputStream());
    image = cropImage(image);
    image = resizeImage(image);
    return compressImage(image);
  }
}
