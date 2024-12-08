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


    public void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is empty or null, cannot process.");
        }
        String fileName = file.getOriginalFilename();
        if (fileName == null || fileName.trim().isEmpty()) {
            throw new IllegalArgumentException("File name is missing or invalid.");
        }
    }

    public String generateNewFileName(MultipartFile file) {

        String originalFileName = file.getOriginalFilename();
        String sanitizedFileName = sanitizeFileName(originalFileName);
        return appendTimestamp(sanitizedFileName);
    }



    public String generatePath(MultipartFile file, String fileCategory, String newFileName) {

        // Determine the target directory based on fileCategory
        String targetDirectory = getTargetDirectory(fileCategory);

        // Generate the full file path
        return targetDirectory + File.separator + newFileName;
    }


    public String getTargetDirectory(String fileCategory) {
        if ("pass".equalsIgnoreCase(fileCategory)) {
            return passPicsDirectory;
        } else if ("stud".equalsIgnoreCase(fileCategory)) {
            return studPicsDirectory;
        } else {
            throw new IllegalArgumentException("Invalid file category. Must be either 'pass' or 'stud'.");
        }
    }


    public String sanitizeFileName(String fileName) {
        return fileName.replaceAll("[^a-zA-Z0-9.\\-_]", "_");
    }


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

    public void removeFile(String filePath) throws IOException {
        // Ensure the file path is not null or empty
        if (filePath == null || filePath.isEmpty()) {
            throw new IllegalArgumentException("File path cannot be null or empty");
        }

        // Convert the string path to a Path object
        Path pathToFile = Paths.get(filePath);

        // Check if the file exists before attempting deletion
        if (Files.exists(pathToFile)) {
            try {
                // Delete the file
                Files.delete(pathToFile);
                log.info("File deleted successfully: {}", filePath);
            } catch (IOException e) {
                // Log the exception and rethrow if needed
                log.error("Error deleting file: {}", filePath, e);
                throw new IOException("Error deleting file", e);
            }
        } else {
            // File does not exist, log a warning
            log.warn("File not found, cannot delete: {}", filePath);
        }
    }
}

