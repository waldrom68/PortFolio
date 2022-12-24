// Orden de creacion 0, Que es lo que voy a mostrar?

package com.portfolio.DTO;

import java.io.Serializable;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DTOLaboralCareer   implements Serializable {
    private Long id;
//    private String position;
    private String resume;
    private Date startDate;
    private Date endDate;
    private int orderdeploy ;
    private boolean status;
    
    private String organization;
    private String orga_resume;
    private String roleposition;

    public DTOLaboralCareer() {
    }
    
    
}

