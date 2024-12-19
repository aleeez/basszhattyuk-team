package org.dn.team.basszhattyuk.mapper;

import org.dn.team.basszhattyuk.dto.incoming.PlayerInDTO;
import org.dn.team.basszhattyuk.dto.incoming.PlayerUpdateDTO;
import org.dn.team.basszhattyuk.dto.outgoing.PlayerAdminDTO;
import org.dn.team.basszhattyuk.dto.outgoing.PlayerKmdszDTO;
import org.dn.team.basszhattyuk.dto.outgoing.PlayerSelfDTO;
import org.dn.team.basszhattyuk.model.PlayerModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;
import java.util.Optional;

@Mapper(componentModel = "spring")
public interface PlayerMapper {

    // incoming data
    PlayerModel mapToPlayerModel(PlayerInDTO playerDTO);
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "passPic", ignore = true)
    @Mapping(target = "studIDPic", ignore = true)
    PlayerModel updatePlayerFromDto(PlayerUpdateDTO dto, @MappingTarget PlayerModel entity);


    // outgoing data
    PlayerAdminDTO mapToPlayerAdminDto(PlayerModel player);
    PlayerKmdszDTO mapToPlayerKmdszDto(PlayerModel player);
    PlayerSelfDTO mapToPlayerSelfDto(PlayerModel player);

    // outgoing data
    List<PlayerAdminDTO> mapToPlayersAdminDto(List<PlayerModel> players);
    List<PlayerKmdszDTO> mapToPlayersKmdszDto(List<PlayerModel> players);
    List<PlayerSelfDTO> mapToPlayersSelfDto(List<PlayerModel> players);
}
