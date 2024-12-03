package org.dn.team.basszhattyuk.repository.dev;

import org.dn.team.basszhattyuk.model.FileData;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Profile("dev")
public interface DevFileRepository extends JpaRepository<FileData, Integer> {

    Optional<FileData> findByFileName(String fileName);
}
