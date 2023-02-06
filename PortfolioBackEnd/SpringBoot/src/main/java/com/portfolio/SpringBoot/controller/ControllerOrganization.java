// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.model.Organization;
import com.portfolio.SpringBoot.service.IOrganizationService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


// Recibe las peticiones y delega el negocio (es el pivot de la aplicacion)
@RestController

public class ControllerOrganization {
    //    Creamos la dependencia con el servicio
    @Autowired 
    private IOrganizationService orgaServ;
    
    
    @PostMapping ("/edit/organization")
    public Organization crearorganization (@RequestBody Organization orga) {
    
        return orgaServ.crearOrganizacion(orga);
    
    }
    
    @DeleteMapping ("/del/organization/{id}")
    public void borrarOrganization (@PathVariable Long id) {
    
        orgaServ.borrarOrganizacion(id);
        
    }
     
//    @GetMapping ("/list/organization/all")
//    public List<Organization> verOrganization() {
//    
//        return orgaServ.verOrganizacion();
//    
//    }
    
    @GetMapping ("/list/organization/{id}")
    public List<Organization> verByPersonId (@PathVariable Long id) {
    
        return orgaServ.verByPersonId(id);
        
    }
}
