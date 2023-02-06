// Orden de creacion 0, Que es lo que voy a mostrar?

package com.portfolio.SpringBoot.DTO;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DTOProject implements Serializable {
    
    private long id;
    private String name;
    private String resume;
    private String url;
    private String since;
    private int orderdeploy = 0;

    public DTOProject() {
    }
    
    
}

