package org.dn.team.basszhattyuk.repository.dev;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.dn.team.basszhattyuk.config.DevConfig;
import org.dn.team.basszhattyuk.repository.exception.RepositoryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayDeque;
import java.util.Deque;

@Component
@Slf4j
@Profile("dev")
public class DevConnectionManager {
    @Autowired
    private DevConfig config;

    private Deque<Connection> pool;

    @PostConstruct
    public synchronized void buildConnectionManager() {
        try {
            this.pool = new ArrayDeque<>();
            Class.forName(config.getDriver());

            StringBuilder url = new StringBuilder();
            url.append(config.getUrl())
                    .append('/')
                    .append(config.getDatabase())
                    .append("?user=")
                    .append(config.getUsername())
                    .append("&password=")
                    .append(config.getPassword())
                    .append("&autoReconnect=true");
            for (int c = 0; c < config.getPoolSize(); ++c) {
                pool.add(DriverManager.getConnection(url.toString()));
            }

            log.info("Successfully initialized ConnectionManager and filled pool with {} connections.",
                    config.getPoolSize());
        } catch (ClassNotFoundException | SQLException e) {
            log.error("Failed to initialize ConnectionManager.", e);
            throw new RepositoryException("Failed to initialize ConnectionManager.", e);
        }
    }

    public synchronized Connection getConnection() {
        if (pool.isEmpty()) {
            log.error("No more connections available.");
            throw new RepositoryException("No more connections available.");
        }
        return pool.pop();
    }

    public synchronized void returnConnection(Connection connection) {
        if (pool.size() < config.getPoolSize()) {
            pool.add(connection);
        }
    }
}

