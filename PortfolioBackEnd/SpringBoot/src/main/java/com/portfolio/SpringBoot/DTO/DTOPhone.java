// Orden de creacion 0, Que es lo que voy a mostrar?

package com.portfolio.SpringBoot.DTO;

import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DTOPhone  implements Serializable {
    private long id;
    private String description;
    private String number;
    private int orderdeploy;
}
