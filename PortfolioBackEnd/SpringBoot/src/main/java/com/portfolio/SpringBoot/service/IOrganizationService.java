// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Organization;
import java.util.List;


public interface IOrganizationService {
    public void crearOrganizacion(Organization orga);
    public void borrarOrganizacion(Long id);
    public Organization buscarOrganizacion(Long id);
    
    public List<Organization> verOrganizacion();
}
