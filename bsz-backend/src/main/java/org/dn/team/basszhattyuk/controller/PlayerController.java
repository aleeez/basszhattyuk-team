package org.dn.team.basszhattyuk.controller;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.dn.team.basszhattyuk.dto.incoming.PlayerInDTO;
import org.dn.team.basszhattyuk.dto.outgoing.PlayerAdminDTO;
import org.dn.team.basszhattyuk.dto.outgoing.PlayerSelfDTO;
import org.dn.team.basszhattyuk.mapper.PlayerMapper;
import org.dn.team.basszhattyuk.model.PlayerModel;
import org.dn.team.basszhattyuk.repository.dev.DevPlayerDAO;
import org.dn.team.basszhattyuk.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/players")
@Slf4j
public class PlayerController {

    @Autowired
    private DevPlayerDAO playerDAO;

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


    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PlayerSelfDTO> getPlayerById(@PathVariable("id") Long id) {
        log.info("Fetching player with ID: {}", id);

        // Fetch player from the service by ID
        PlayerModel player = playerService.getPlayer(id);

        if (player == null) {
            // Return 404 if the player is not found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
           PlayerSelfDTO playerDTO = playerMapper.mapToPlayerSelfDto(player);

        return new ResponseEntity<>(playerDTO, HttpStatus.OK);
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
    public ResponseEntity<String> deletePlayer(@PathVariable("id") Long id) {
        try {
            // Call the deletePlayer service method
            playerService.deletePlayer(id);
            return new ResponseEntity<>("Player deleted successfully", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            // If the player is not found, return a 404 status
            return new ResponseEntity<>("Player not found", HttpStatus.NOT_FOUND);
        } catch (IOException e) {
            // If there is an issue with file deletion, return a 500 status
            return new ResponseEntity<>("Error while deleting files", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            // Handle any unexpected errors
            return new ResponseEntity<>("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
