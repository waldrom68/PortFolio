// Orden de creacion 0, Que es lo que voy a mostrar?

package com.portfolio.SpringBoot.DTO;

import com.portfolio.SpringBoot.model.Degree;
import com.portfolio.SpringBoot.model.Organization;
import java.io.Serializable;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DTOStudie  implements Serializable {
    private Long id;
    private String name;
    private String startDate;
    private String endDate;
    private int orderdeploy ;
    private boolean status;
    
    private Organization organization;
    private Degree degree;


    public DTOStudie() {
    }
    
}

