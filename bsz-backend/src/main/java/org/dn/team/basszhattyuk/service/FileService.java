package org.dn.team.basszhattyuk.service;

import org.dn.team.basszhattyuk.model.FileData;
import org.dn.team.basszhattyuk.repository.dev.DevFileRepository;
import org.dn.team.basszhattyuk.service.utils.FileProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class FileService {

    @Autowired
    private DevFileRepository repository;

    @Autowired
    private FileProcessor fileProcessor;


    public String uploadImage(MultipartFile file, String fileCategory) throws IOException {

        // Validate the file and it's name
        fileProcessor.validateFile(file);

        // Generate unique filename
        String uniqueFileName = fileProcessor.generateNewFileName(file);

        // Get new file path
        String filePath = fileProcessor.generatePath(file, fileCategory, uniqueFileName);

        // Save the file metadata to the database
        FileData fileData = repository.save(FileData.builder()
                .fileName(uniqueFileName)
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





}
