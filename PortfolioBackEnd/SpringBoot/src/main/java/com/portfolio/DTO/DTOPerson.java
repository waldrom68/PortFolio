// Orden de creacion 0, Que es lo que voy a mostrar?

package com.portfolio.DTO;

import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DTOPerson implements Serializable {

    private Long id;
    private String name;
    private String lastName;
    
    
}
