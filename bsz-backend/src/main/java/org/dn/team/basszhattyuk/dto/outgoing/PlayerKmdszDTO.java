package org.dn.team.basszhattyuk.dto.outgoing;

import lombok.Data;

@Data
public class PlayerKmdszDTO {

    private String lastName;
    private String firstName;
    private String seriaNr;
    private Boolean external;
    private String kmdszID;
}
