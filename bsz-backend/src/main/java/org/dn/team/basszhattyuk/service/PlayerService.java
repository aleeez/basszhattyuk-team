package org.dn.team.basszhattyuk.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.dn.team.basszhattyuk.model.FileData;
import org.dn.team.basszhattyuk.model.PlayerModel;
import org.dn.team.basszhattyuk.repository.dev.DevFileRepository;
import org.dn.team.basszhattyuk.repository.dev.DevPlayerDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class PlayerService {

    @Autowired
    private DevPlayerDAO playerRepository;

    @Autowired
    private DevFileRepository fileRepository;

    @Autowired
    private FileService fileService;

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

        return playerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Player not found"));
    }

    @Transactional(rollbackOn = {IOException.class })
    public void deletePlayer(Long id) throws IOException {

        PlayerModel player = playerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Player not found"));

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


}

