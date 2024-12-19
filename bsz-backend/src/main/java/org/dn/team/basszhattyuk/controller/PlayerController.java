package org.dn.team.basszhattyuk.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.dn.team.basszhattyuk.dto.incoming.PlayerInDTO;
import org.dn.team.basszhattyuk.dto.incoming.PlayerUpdateDTO;
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


    @GetMapping(value = "/profile/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PlayerSelfDTO> getPlayerById(@PathVariable("id") Long id) {
        log.info("Fetching player with ID: {}", id);

        PlayerModel player = playerService.getPlayer(id);

        if (player == null) {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
           PlayerSelfDTO playerDTO = playerMapper.mapToPlayerSelfDto(player);

        return new ResponseEntity<>(playerDTO, HttpStatus.OK);
    }


    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PlayerSelfDTO>> getAllPlayers() {

        log.info("Fetching all players");

        List<PlayerModel> players = playerService.getAllPlayers();
        List<PlayerSelfDTO> playerDTOs = playerMapper.mapToPlayersSelfDto(players);

        return new ResponseEntity<>(playerDTOs, HttpStatus.OK);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<PlayerSelfDTO> updatePlayer(
            @PathVariable Long id,
            @Valid @RequestBody PlayerUpdateDTO playerUpdateDTO) {
        log.info("Updating player with ID: {}", id);

        try {

            PlayerModel updatedPlayer = playerService.updatePlayer(id, playerUpdateDTO);
            PlayerSelfDTO responseDto = playerMapper.mapToPlayerSelfDto(updatedPlayer);

            return new ResponseEntity<>(responseDto, HttpStatus.OK);

        } catch (EntityNotFoundException e) {
            log.error("Player with ID {} not found: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("Error updating player with ID {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PatchMapping(path = "/patch/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<PlayerSelfDTO> patchPlayer(@PathVariable Long id, @RequestBody JsonPatch patch) {
        try {
            PlayerModel patchedPlayer = playerService.patchPlayer(id, patch);
            PlayerSelfDTO responseDto = playerMapper.mapToPlayerSelfDto(patchedPlayer);

            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        } catch (JsonPatchException | JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePlayer(@PathVariable("id") Long id) {
        try {

            playerService.deletePlayer(id);
            return new ResponseEntity<>("Player deleted successfully", HttpStatus.OK);
        } catch (EntityNotFoundException e) {

            return new ResponseEntity<>("Player not found", HttpStatus.NOT_FOUND);
        } catch (IOException e) {
            
            return new ResponseEntity<>("Error while deleting files", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
