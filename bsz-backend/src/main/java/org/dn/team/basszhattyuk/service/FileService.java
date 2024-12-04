package org.dn.team.basszhattyuk.service;

import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.dn.team.basszhattyuk.model.FileData;
import org.dn.team.basszhattyuk.repository.dev.DevFileRepository;
import org.dn.team.basszhattyuk.service.utils.FileProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
@Slf4j
public class FileService {

    @Autowired
    private DevFileRepository repository;

    @Autowired
    private FileProcessor fileProcessor;


    @Transactional(rollbackOn = {IOException.class, DataIntegrityViolationException.class, PersistenceException.class})
    public String uploadImage(MultipartFile file, String fileCategory) throws IOException {

        // Validate the file and its name
        fileProcessor.validateFile(file);

        // Generate unique filename
        String uniqueFileName = fileProcessor.generateNewFileName(file);

        // Get new file path
        String filePath = fileProcessor.generatePath(file, fileCategory, uniqueFileName);

        // Save the file metadata to the database
        try {
            repository.save(FileData.builder()
                    .fileName(uniqueFileName)
                    .fileType(file.getContentType())
                    .filePath(filePath)
                    .fileCategory(fileCategory)
                    .build());
        } catch (DataIntegrityViolationException | PersistenceException e) {

            log.error("Error saving file metadata: {}", e.getMessage());
            log.info("Transaction rollback triggered.");
            throw new RuntimeException("Error saving file metadata", e);
        }

        // Save the actual file to the directory
        File destinationFile = new File(filePath);
        try {
            file.transferTo(destinationFile);
        } catch (IOException e) {
            log.error("Failed to move file to directory: {}", filePath);
            log.info("Transaction rollback triggered.");
            throw new IOException("Failed to move file to directory: " + filePath, e);
        }

        // Verify that the file was successfully uploaded
        if (destinationFile.exists() && destinationFile.length() > 0) {
            return "File uploaded successfully: " + filePath;
        }

        return "File upload failed: Unable to save file to the server.";
    }






}
