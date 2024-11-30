package org.dn.team.basszhattyuk.repository.dev;

import org.dn.team.basszhattyuk.model.FileData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DevFileRepository extends JpaRepository<FileData, Integer> {

    Optional<FileData> findByFileName(String fileName);
}
