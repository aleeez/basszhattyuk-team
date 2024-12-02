package org.dn.team.basszhattyuk.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "dev_files")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FileData extends BaseModel {

    @NotNull
    private String filePath;

    @Column(unique = true)
    private String fileName;

    @NotNull
    private String fileType;

    @NotNull
    @Pattern(regexp = "^(pass|stud)$", message = "File category must be either 'pass' or 'stud'")
    private String fileCategory;
}
