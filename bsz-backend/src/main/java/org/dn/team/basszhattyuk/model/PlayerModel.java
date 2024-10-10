package org.dn.team.basszhattyuk.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "dev_players")
public class PlayerModel extends BaseModel {

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
