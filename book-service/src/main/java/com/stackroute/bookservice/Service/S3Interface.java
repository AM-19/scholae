package com.stackroute.bookservice.Service;

import org.springframework.web.multipart.MultipartFile;

public interface S3Interface {
    String uploadFile(MultipartFile multipartFile);
}
//AWS S3 Interface