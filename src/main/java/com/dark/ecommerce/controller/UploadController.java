package com.dark.ecommerce.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/upload")
public class UploadController {

 @PostMapping
public String uploadImage(
        @RequestParam("file") MultipartFile file
) throws IOException {

    String fileName =
            System.currentTimeMillis()
            + "_"
            + file.getOriginalFilename();

    Path uploadPath =
            Paths.get("uploads");

    if (!Files.exists(uploadPath)) {
        Files.createDirectories(uploadPath);
    }

    Path filePath =
            uploadPath.resolve(fileName);
System.out.println(filePath.toAbsolutePath());
    Files.copy(
            file.getInputStream(),
            filePath
    );

    return "http://localhost:8080/uploads/"
            + fileName;
}
}