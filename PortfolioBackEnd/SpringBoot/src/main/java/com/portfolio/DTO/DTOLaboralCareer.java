// Orden de creacion 0, Que es lo que voy a mostrar?

package com.portfolio.DTO;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DTOLaboralCareer   implements Serializable {
    private Long id;
//    private String position;
    private String resume;
    private String startDate;
    private String endDate;
    private int orderdeploy ;
    private boolean status;
    
    private Long organization;
    private Long roleposition;

    public DTOLaboralCareer() {
    }
    
    
}

