package org.dn.team.basszhattyuk.service;

import org.dn.team.basszhattyuk.model.FileData;
import org.dn.team.basszhattyuk.repository.dev.DevFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class FileService {

    @Autowired
    private DevFileRepository repository;

    @Value("${spring.file-source.pass-pics}")
    private String passPicsDirectory;

    public String uploadImage(MultipartFile file) throws IOException {

        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty, cannot upload.");
        }

        File directory = new File(passPicsDirectory);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String filePath = passPicsDirectory + File.separator + file.getOriginalFilename();
        FileData fileData = repository.save(FileData.builder()
                                      .fileName(file.getOriginalFilename())
                                      .fileType(file.getContentType())
                                      .filePath(filePath)
                                      .build());

        File destinationFile = new File(filePath);
        file.transferTo(destinationFile);

        if (destinationFile.exists() && destinationFile.length() > 0) {
            return "File uploaded successfully: " + filePath;
        }

        return "File upload failed: Unable to save file to the server.";
    }
}
