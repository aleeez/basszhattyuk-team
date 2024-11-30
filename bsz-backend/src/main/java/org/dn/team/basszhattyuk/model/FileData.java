package org.dn.team.basszhattyuk.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "dev_passPics")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FileData extends BaseModel {

    private String filePath;
    private String fileName;
    private String fileType;
}
