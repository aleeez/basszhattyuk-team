package org.dn.team.basszhattyuk.dto.outgoing;

import lombok.Data;

@Data
public class PlayerSelfDTO {

    private Long id;
    private String lastName;
    private String firstName;
    private String phoneNr;
    private String email;
    private String seriaNr;
    private String fbLink;
    private Boolean external;
    private String kmdszID;

}
