// Orden de creacion 0, Que es lo que voy a mostrar?

package com.portfolio.SpringBoot.DTO;

import com.portfolio.SpringBoot.model.Organization;
import com.portfolio.SpringBoot.model.RolePosition;
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
    
    private Organization organization;
    private RolePosition roleposition;

    public DTOLaboralCareer() {
    }
    
    
}

