package org.dn.team.basszhattyuk.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "dev_orders")
public class OrderModel extends BaseModel {

    private ItemModel[] items;
    private Integer totalPrice;
    private String note;
}
