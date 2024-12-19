package org.dn.team.basszhattyuk.repository.dev;

import jakarta.persistence.EntityNotFoundException;
import org.dn.team.basszhattyuk.model.PlayerModel;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Profile("dev")
public interface DevPlayerDAO extends JpaRepository<PlayerModel, Long> {

    default PlayerModel getPlayer(Long id) {
        return findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Player with ID " + id + " not found"));
    }
}
