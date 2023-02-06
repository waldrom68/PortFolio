// Orden de creacion 0, Que es lo que voy a mostrar?

package com.portfolio.SpringBoot.DTO;

import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DTOSoftskill implements Serializable {
    
    private long id;
    private String name;
    private int assessment;
    private int orderdeploy;

    public DTOSoftskill() {
    }

}
