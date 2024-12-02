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
    @Pattern(regexp = "^[a-zA-Z]+$", message = "First name must contain only letters.")
    private String lastName;

    @NotNull
    @Pattern(regexp = "^[a-zA-Z]+$", message = "Last name must contain only letters.")
    private String firstName;

    @NotNull
    @Column(unique = true)
    @Pattern(regexp = "^0\\d{9}$", message = "Phone number must start with 0 and have exactly 10 digits")
    private String phoneNr;

    @NotNull
    @Column(unique = true)
    @Email(message = "Invalid email address")
    private String email;

    @NotNull
    @Column(unique = true)
    @Pattern(regexp = "^[A-Z]{2}\\d{6}$", message = "Invalid Seria Nr.")
    private String seriaNr;

    @NotNull
    @Column(unique = true)
    @Pattern(
            regexp = "^(https?://)?(www\\.)?facebook\\.com/[a-zA-Z0-9.]+/?$",
            message = "Invalid Facebook link"
    )
    private String fbLink;

    @ColumnDefault("false")
    private Boolean external;

    @Column(unique = true)
    private String kmdszID;

    @NotNull
    @OneToOne
    @JoinColumn(name = "pass_pic_id")
    private FileData passPic;

    @OneToOne
    @JoinColumn(name = "stud_pic_id")
    private FileData studIDPic;
}
