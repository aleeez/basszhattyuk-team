package org.dn.team.basszhattyuk.service;

import org.dn.team.basszhattyuk.model.FileData;
import org.dn.team.basszhattyuk.model.PlayerModel;
import org.dn.team.basszhattyuk.repository.dev.DevFileRepository;
import org.dn.team.basszhattyuk.repository.dev.DevPlayerDAO;
import org.springframework.beans.factory.annotation.Autowired;
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

    public PlayerModel savePlayer(PlayerModel player, MultipartFile passPic, MultipartFile studIdPic) throws IOException {

        // First, upload the pass and stud ID pictures
        String passPicResult = fileService.uploadImage(passPic, "pass");
        String studIdPicResult = fileService.uploadImage(studIdPic, "stud");


        // Save the file metadata for passPic and studIdPic
        FileData passFileData = fileRepository.findByFileName(passPic.getOriginalFilename()).orElseThrow(() -> new IOException("File data not found for passPic"));
        FileData studFileData = fileRepository.findByFileName(studIdPic.getOriginalFilename()).orElseThrow(() -> new IOException("File data not found for studIdPic"));


        // Update the player with the references to the saved file metadata
        player.setPassPic(passFileData);
        player.setStudIDPic(studFileData);

        // Save the player to the database

        return playerRepository.save(player);
    }
}

