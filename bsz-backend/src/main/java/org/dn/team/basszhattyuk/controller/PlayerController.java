package org.dn.team.basszhattyuk.controller;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.dn.team.basszhattyuk.dto.incoming.PlayerInDTO;
import org.dn.team.basszhattyuk.dto.outgoing.PlayerAdminDTO;
import org.dn.team.basszhattyuk.mapper.PlayerMapper;
import org.dn.team.basszhattyuk.model.PlayerModel;
import org.dn.team.basszhattyuk.repository.PlayerDAO;
import org.dn.team.basszhattyuk.service.FileService;
import org.dn.team.basszhattyuk.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
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


    @Autowired
    private PlayerService playerService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createPlayer(@Valid @ModelAttribute PlayerInDTO playerInDTO) {
        log.info("Creating player: {}", playerInDTO);
        MultipartFile passPic = playerInDTO.getPassPic();
        MultipartFile studIdPic = playerInDTO.getStudIDPic();
        log.info("---- uploading files ----: {}", passPic);
        PlayerModel newPlayer = playerMapper.mapToPlayerModel(playerInDTO);
        try {
            PlayerModel savedPlayer = playerService.savePlayer(newPlayer, passPic, studIdPic);
            return new ResponseEntity<>("Player saved successfully with ID: " + savedPlayer.getId(), HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>("Error uploading files or saving player: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }

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
