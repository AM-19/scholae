package com.stackroute.bookservice.Service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class S3InterfaceImpl implements S3Interface {
    @Autowired
    private AmazonS3 amazonS3;
    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Override
    @Async
    public String uploadFile(final MultipartFile multipartFile) {
        final File file = convertMultiPartFileToFile(multipartFile);
        try {
            return uploadFileToS3Bucket(bucketName, file);
        } catch (final AmazonServiceException ex) {
            ex.printStackTrace();
            return ex.getErrorMessage();
        }
        finally {
            file.delete();           // To remove the file locally created in the project folder.
        }
    }

    //Convert MultipartFile to File
    private File convertMultiPartFileToFile(final MultipartFile multipartFile) {
        final File file = new File(multipartFile.getOriginalFilename());
        try (final FileOutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(multipartFile.getBytes());
        } catch (final IOException ex) {
        }
        return file;
    }


    //Uploads File in Bucket and give resource url
    private String uploadFileToS3Bucket(final String bucketName, final File file) {
        final String uniqueFileName = LocalDateTime.now() + "_" + file.getName();
        final PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, uniqueFileName, file);
        amazonS3.putObject(putObjectRequest);
        AmazonS3Client amazonS3Client = new AmazonS3Client();
        return amazonS3Client.getResourceUrl(bucketName,uniqueFileName); // Returns String Url
    }
}