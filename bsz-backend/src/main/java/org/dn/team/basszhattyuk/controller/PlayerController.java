package org.dn.team.basszhattyuk.controller;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.dn.team.basszhattyuk.dto.incoming.PlayerInDTO;
import org.dn.team.basszhattyuk.dto.outgoing.PlayerAdminDTO;
import org.dn.team.basszhattyuk.mapper.PlayerMapper;
import org.dn.team.basszhattyuk.model.PlayerModel;
import org.dn.team.basszhattyuk.repository.PlayerDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/players")
@Slf4j
public class PlayerController {

    @Autowired
    private PlayerDAO playerDAO;

    @Autowired
    private PlayerMapper playerMapper;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public PlayerAdminDTO createPlayer(@RequestBody @Valid PlayerInDTO playerDTO) {
        log.info("Creating player: {}", playerDTO);
        PlayerModel newPlayer = playerMapper.mapToPlayerModel(playerDTO);
        playerDAO.save(newPlayer);
        log.info("New player id: {}", newPlayer.getId());
        return playerMapper.mapToPlayerAdminDto(newPlayer);
    }

    @GetMapping("/{id}")
    public PlayerAdminDTO getPlayerById(@PathVariable Long id) {
        log.info("Getting player by id: {}", id);
        Optional<PlayerModel> player = playerDAO.findById(id);
        if (player.isPresent()) {
            return playerMapper.mapToPlayerAdminDto(player.get());
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No player found with id: " + id);
        }
    }

    @GetMapping
    public List<PlayerAdminDTO> getPlayersForAdmin() {
        log.info("Getting players name and phone number");
        return playerMapper.mapToPlayersAdminDto((List<PlayerModel>) playerDAO.findAll());
    }

    @PutMapping("/{id}")
    public PlayerAdminDTO updatePlayer(@PathVariable Long id,
                             @RequestBody @Valid PlayerInDTO playerInDTO
    ) {
        log.info("Updating player with id: {}", id);
        PlayerModel player = playerMapper.mapToPlayerModel(playerInDTO);
        player.setId(id);
        playerDAO.save(player);
        return playerMapper.mapToPlayerAdminDto(player);
    }

    @DeleteMapping("/{id}")
    public void deleteGuide(@PathVariable Long id) {
        log.info("Deleting player with id: {}", id);
        playerDAO.deleteById(id);
    }
}
