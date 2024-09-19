package org.dn.team.basszhattyuk.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties
@ConfigurationProperties(prefix = "dev")
@Data
public class DevConfig {
    private String url;
    private String username;
    private String password;
    private String database;
    private Integer poolSize;
    private String driver;
}
