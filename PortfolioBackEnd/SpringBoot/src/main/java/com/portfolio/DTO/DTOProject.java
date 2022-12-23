// Orden de creacion 0, Que es lo que voy a mostrar?

package com.portfolio.DTO;

import java.io.Serializable;
import java.time.Year;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DTOProject implements Serializable {
    
    private long id;
    private String name;
    private String resume;
    private Year since;
    private String url;
    private int orderdeploy = 0;

    public DTOProject() {
    }
    
    
}

