package org.dn.team.basszhattyuk.service.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;

@Component
public class FileProcessor {

    @Value("${spring.file-source.pass-pics}")
    private static String passPicsDirectory;

    @Value("${spring.file-source.stud-pics}")
    private static String studPicsDirectory;

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

        // Generate target directory if it doesn't exist
        generateDirectory(targetDirectory);

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

    public void generateDirectory(String targetDirectory) {

        // Create the directory if it doesn't exist
        File directory = new File(targetDirectory);
        if (!directory.exists()) {
            directory.mkdirs();
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
}

