package org.dn.team.basszhattyuk.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.dn.team.basszhattyuk.dto.incoming.PlayerUpdateDTO;
import org.dn.team.basszhattyuk.mapper.PlayerMapper;
import org.dn.team.basszhattyuk.model.FileData;
import org.dn.team.basszhattyuk.model.PlayerModel;
import org.dn.team.basszhattyuk.repository.dev.DevFileRepository;
import org.dn.team.basszhattyuk.repository.dev.DevPlayerDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {

    @Autowired
    private DevPlayerDAO playerRepository;

    @Autowired
    private DevFileRepository fileRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    private PlayerMapper playerMapper;

    @Autowired
    private ObjectMapper objectMapper;

    @Transactional(rollbackOn = {IOException.class, DataIntegrityViolationException.class})
    public PlayerModel savePlayer(PlayerModel player, MultipartFile passPic, MultipartFile studIdPic) throws IOException {
        FileData passPicResult = fileService.uploadImage(passPic, "pass");
        FileData studIdPicResult = fileService.uploadImage(studIdPic, "stud");

        // Simulate file data retrieval
        FileData passFileData = fileRepository.findById(passPicResult.getId())
                .orElseThrow(() -> new IOException("File data not found for passPic"));
        FileData studFileData = fileRepository.findById(studIdPicResult.getId())
                .orElseThrow(() -> new IOException("File data not found for studIdPic"));

        player.setPassPic(passFileData);
        player.setStudIDPic(studFileData);

        // Save player to the database
        try {
            return playerRepository.save(player);
        } catch (DataIntegrityViolationException e) {
            // Handle or rethrow if necessary
            throw new RuntimeException("Data integrity violation while saving player", e);
        }
    }

    public PlayerModel getPlayer(Long id) {

        return playerRepository.getPlayer(id);
    }

    public List<PlayerModel> getAllPlayers() {

        return playerRepository.findAll();
    }

    @Transactional(rollbackOn = {IOException.class })
    public void deletePlayer(Long id) throws IOException {

        PlayerModel player = playerRepository.getPlayer(id);

        try {
            // Deleting the associated files
            fileService.deleteFile(player.getPassPic());
            fileService.deleteFile(player.getStudIDPic());
        } catch (IOException e) {
            // In case file deletion fails, the transaction will be rolled back automatically
            throw new IOException("Error while deleting files", e);
        }

        // Deleting the player from the database
        playerRepository.delete(player);
    }

    public PlayerModel updatePlayer(Long id, PlayerUpdateDTO playerUpdateDTO) {
        // Fetch the existing player
        Optional<PlayerModel> optionalPlayer = playerRepository.findById(id);
        PlayerModel existingPlayer = optionalPlayer.orElseThrow(() ->
                new EntityNotFoundException("Player with ID " + id + " not found"));

        // Map the data from PlayerUpdateDTO to the existing PlayerModel and return it
        PlayerModel updatedPlayer = playerMapper.updatePlayerFromDto(playerUpdateDTO, existingPlayer);

        // Save the updated player entity
        return playerRepository.save(updatedPlayer);

    }

    public PlayerModel patchPlayer(Long id, JsonPatch patch) throws JsonPatchException, JsonProcessingException {


        PlayerModel existingPlayer = playerRepository.getPlayer(id);

        // apply patch
        JsonNode patched = patch.apply(objectMapper.convertValue(existingPlayer, JsonNode.class));
        PlayerModel patchedPlayer = objectMapper.treeToValue(patched, PlayerModel.class);
        playerRepository.save(patchedPlayer);
        return patchedPlayer;
    }



}

