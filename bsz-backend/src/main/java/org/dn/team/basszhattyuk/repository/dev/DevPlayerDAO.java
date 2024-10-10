package org.dn.team.basszhattyuk.repository.dev;

import org.dn.team.basszhattyuk.model.PlayerModel;
import org.dn.team.basszhattyuk.repository.PlayerDAO;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Profile("dev")
public interface DevPlayerDAO extends PlayerDAO, JpaRepository<PlayerModel, Long> {
}
