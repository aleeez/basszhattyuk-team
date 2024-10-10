package org.dn.team.basszhattyuk.dto.incoming;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
public class PlayerInDTO {

    private String lastName;
    private String firstName;
    private String phoneNr;
    private String email;
    private String seriaNr;
    private String fbLink;
    private Boolean external;
    private String kmdszID;
    private String passPic;
    private String studIDPic;
}
