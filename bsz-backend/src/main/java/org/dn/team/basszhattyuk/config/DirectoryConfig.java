package org.dn.team.basszhattyuk.config;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import java.io.File;

@Slf4j
@Configuration
public class DirectoryConfig {

    @Value("${spring.file-source.pass-pics}")
    private String passPicsDirectory;

    @Value("${spring.file-source.stud-pics}")
    private String studPicsDirectory;

    @PostConstruct
    public void createDirectories() {

        createDirectory(passPicsDirectory);
        createDirectory(studPicsDirectory);
    }

    private void createDirectory(String directoryPath) {
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            boolean created = directory.mkdirs();
            if (created) {
                log.info("Directory created: {}", directoryPath);
            } else {
                throw new RuntimeException("Failed to create directory: " + directoryPath);
            }
        }
    }
}
