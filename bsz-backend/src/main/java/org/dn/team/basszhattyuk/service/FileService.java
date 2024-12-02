package org.dn.team.basszhattyuk.service;

import org.dn.team.basszhattyuk.model.FileData;
import org.dn.team.basszhattyuk.repository.dev.DevFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@Service
public class FileService {

    @Autowired
    private DevFileRepository repository;

    @Value("${spring.file-source.pass-pics}")
    private String passPicsDirectory;

    @Value("${spring.file-source.stud-pics}")
    private String studPicsDirectory;


    public String uploadImage(MultipartFile file, String fileCategory) throws IOException {

        String filePath = getPath(file, fileCategory);

        // Save the file metadata to the database
        FileData fileData = repository.save(FileData.builder()
                .fileName(file.getOriginalFilename())
                .fileType(file.getContentType())
                .filePath(filePath)
                .fileCategory(fileCategory)
                .build());

        // Save the actual file to the directory
        File destinationFile = new File(filePath);
        file.transferTo(destinationFile);

        // Verify that the file was successfully uploaded
        if (destinationFile.exists() && destinationFile.length() > 0) {
            return "File uploaded successfully: " + filePath;
        }

        return "File upload failed: Unable to save file to the server.";
    }

    private String getPath(MultipartFile file, String fileCategory) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty, cannot upload.");
        }

        // Determine the target directory based on fileCategory
        String targetDirectory = null;

        if ("pass".equalsIgnoreCase(fileCategory)) {
            targetDirectory = passPicsDirectory;
        } else if ("stud".equalsIgnoreCase(fileCategory)) {
            targetDirectory = studPicsDirectory;
        } else {
            throw new IllegalArgumentException("Invalid file category. Must be either 'pass' or 'stud'.");
        }

        // Create the directory if it doesn't exist
        File directory = new File(targetDirectory);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Generate the full file path
        return targetDirectory + File.separator + file.getOriginalFilename();
    }

    public byte[] downloadImage(String fileName) throws IOException {
        Optional<FileData> fileData = repository.findByFileName(fileName);
        String filePath = fileData.map(FileData::getFilePath).orElse("Default file path or error message");
        return Files.readAllBytes(new File(filePath).toPath());
    }
}
