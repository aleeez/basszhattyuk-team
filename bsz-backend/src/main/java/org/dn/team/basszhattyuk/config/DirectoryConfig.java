package org.dn.team.basszhattyuk.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import java.io.File;

@Configuration
public class DirectoryConfig {

    @Value("${spring.file-source.pass-pics}")
    private String passPicsDirectory;

    @Value("${spring.file-source.stud-pics}")
    private String studPicsDirectory;

    @PostConstruct
    public void createDirectories() {
        System.out.println("\n\n\nPass Pics Directory: " + passPicsDirectory);
        System.out.println("\n\n\nStud Pics Directory: " + studPicsDirectory);
        createDirectory(passPicsDirectory);
        createDirectory(studPicsDirectory);
    }

    private void createDirectory(String directoryPath) {
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            boolean created = directory.mkdirs();
            if (created) {
                System.out.println("Directory created: " + directoryPath);
            } else {
                throw new RuntimeException("Failed to create directory: " + directoryPath);
            }
        }
    }
}
