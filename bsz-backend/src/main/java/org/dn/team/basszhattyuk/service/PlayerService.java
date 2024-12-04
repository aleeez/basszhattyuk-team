package org.dn.team.basszhattyuk.service;

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
        String passPicResult = fileService.uploadImage(passPic, "pass");
        String studIdPicResult = fileService.uploadImage(studIdPic, "stud");

        // Simulate file data retrieval
        FileData passFileData = fileRepository.findByFileName(passPic.getOriginalFilename())
                .orElseThrow(() -> new IOException("File data not found for passPic"));
        FileData studFileData = fileRepository.findByFileName(studIdPic.getOriginalFilename())
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

}

