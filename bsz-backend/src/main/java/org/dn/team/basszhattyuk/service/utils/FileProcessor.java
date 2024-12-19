package org.dn.team.basszhattyuk.service.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
@Slf4j
public class FileProcessor {

    @Value("${spring.file-source.pass-pics}")
    private String passPicsDirectory;

    @Value("${spring.file-source.stud-pics}")
    private String studPicsDirectory;


    // checks file's existence
    public void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is empty or null, cannot process.");
        }
        String fileName = file.getOriginalFilename();
        if (fileName == null || fileName.trim().isEmpty()) {
            throw new IllegalArgumentException("File name is missing or invalid.");
        }

        log.info("File {} is valid", fileName);
    }

    // generates a unique name for file
    public String generateNewFileName(MultipartFile file) {

        String originalFileName = file.getOriginalFilename();
        String sanitizedFileName = sanitizeFileName(originalFileName);
        String newFileName = appendTimestamp(sanitizedFileName);
        log.info("New filename is created: {}", newFileName);
        return newFileName;
    }


    // creates the full path to the file
    public String generatePath(MultipartFile file, String fileCategory, String newFileName) {
        String targetDirectory = getTargetDirectory(fileCategory);
        String fullPath = targetDirectory + File.separator + newFileName;
        log.info("Full path is created: {}", fullPath);
        return fullPath;
    }


    // determines if file is a pass pic or a stud id pic
    public String getTargetDirectory(String fileCategory) {
        log.info("Target directory: {}", fileCategory);
        if ("pass".equalsIgnoreCase(fileCategory)) {
            return passPicsDirectory;
        } else if ("stud".equalsIgnoreCase(fileCategory)) {
            return studPicsDirectory;
        } else {
            throw new IllegalArgumentException("Invalid file category. Must be either 'pass' or 'stud'.");
        }
    }

    // replaces shady characters with '_'
    public String sanitizeFileName(String fileName) {
        return fileName.replaceAll("[^a-zA-Z0-9.\\-_]", "_");
    }


    // appends timestamp to the filename - to make it unique
    public String appendTimestamp(String fileName) {
        String timestamp = String.valueOf(System.currentTimeMillis());
        int dotIndex = fileName.lastIndexOf('.');
        if (dotIndex > 0) {
            String name = fileName.substring(0, dotIndex);
            String extension = fileName.substring(dotIndex);
            return name + "_" + timestamp + extension;
        } else {
            return fileName + "_" + timestamp;
        }
    }

    // removes file from filesystem
    public void removeFile(String filePath) throws IOException {

        if (filePath == null || filePath.isEmpty()) {
            throw new IllegalArgumentException("File path cannot be null or empty");
        }

        Path pathToFile = Paths.get(filePath);

        // checks file's existence
        if (Files.exists(pathToFile)) {
            try {
                Files.delete(pathToFile);
                log.info("File deleted successfully: {}", filePath);
            } catch (IOException e) {
                log.error("Error deleting file: {}", filePath, e);
                throw new IOException("Error deleting file", e);
            }
        } else {
            log.warn("File not found, cannot delete: {}", filePath);
        }
    }
}

