package org.dn.team.basszhattyuk.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.ColumnDefault;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "dev_players")
public class PlayerModel extends BaseModel {

    @NotNull
    private String lastName;

    @NotNull
    private String firstName;

    @NotNull
    private String phoneNr;

    @NotNull
    private String email;

    @NotNull
    private String seriaNr;

    @NotNull
    private String fbLink;

    @NotNull
    private Boolean external;

    private String kmdszID;

    @NotNull
    @OneToOne
    @JoinColumn(name = "pass_pic_id")
    private FileData passPic;

    @OneToOne
    @JoinColumn(name = "stud_pic_id")
    private FileData studIDPic;
}
