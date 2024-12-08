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

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createPlayer(@Valid @ModelAttribute PlayerInDTO playerInDTO) {
        log.info("Creating player: {}", playerInDTO);
        MultipartFile passPic = playerInDTO.getPassPic();
        MultipartFile studIdPic = playerInDTO.getStudIDPic();

        PlayerModel newPlayer = playerMapper.mapToPlayerModel(playerInDTO);
        try {
            PlayerModel savedPlayer = playerService.savePlayer(newPlayer, passPic, studIdPic);
            return new ResponseEntity<>("Player saved successfully with ID: " + savedPlayer.getId(), HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>("Error uploading files or saving player: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }


//    @GetMapping(value = "/players/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<PlayerModel> getPlayerById(@PathVariable("id") Long id) {
//        log.info("Fetching player with ID: {}", id);
//
//        // Fetch player from the service by ID
//        PlayerModel player = playerService.getPlayerById(id);
//
//        if (player == null) {
//            // Return 404 if the player is not found
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//
//        // Return the player data if found
//        return new ResponseEntity<>(player, HttpStatus.OK);
//    }


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
