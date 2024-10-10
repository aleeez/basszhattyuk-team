package org.dn.team.basszhattyuk.mapper;

import org.dn.team.basszhattyuk.dto.incoming.PlayerInDTO;
import org.dn.team.basszhattyuk.dto.outgoing.PlayerAdminDTO;
import org.dn.team.basszhattyuk.dto.outgoing.PlayerKmdszDTO;
import org.dn.team.basszhattyuk.model.PlayerModel;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PlayerMapper {

    // incoming data
    PlayerModel mapToPlayerModel(PlayerInDTO playerDTO);

    // outgoing data
    PlayerAdminDTO mapToPlayerAdminDto(PlayerModel player);
    PlayerKmdszDTO mapToPlayerKmdszDto(PlayerModel player);

    // outgoing data
    List<PlayerAdminDTO> mapToPlayersAdminDto(List<PlayerModel> players);
    List<PlayerKmdszDTO> mapToPlayersKmdszDto(List<PlayerModel> players);
}
