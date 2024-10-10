package org.dn.team.basszhattyuk.repository;

import org.dn.team.basszhattyuk.model.PlayerModel;

public interface PlayerDAO extends DAO<PlayerModel> {

    PlayerModel getByPhoneNr(String phone);
}
