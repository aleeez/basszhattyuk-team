package org.dn.team.basszhattyuk.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "dev_items")
public class ItemModel extends BaseModel {

    private String itemName;
    private Integer quantity;
    private String size;
    private String nickName;
    private Integer price;
}
