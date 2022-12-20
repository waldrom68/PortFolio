// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.model.Organization;
import com.portfolio.SpringBoot.service.IOrganizationService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
    
    
    @PostMapping ("/new/organization")
    public void crearorganization (@RequestBody Organization orga) {
    
        orgaServ.crearOrganizacion(orga);
    
    }
    
    @GetMapping ("/del/organization")
    public void borrarOrganization (@PathVariable Long id) {
    
        orgaServ.borrarOrganizacion(id);
        
    }
    
    @PutMapping ("/edit/organization")
    public void editarOrganization(@RequestBody Organization orga) {
    
        orgaServ.crearOrganizacion(orga);

    }
           
    @GetMapping ("/list/organization")
    public List<Organization> verOrganization() {
    
        return orgaServ.verOrganizacion();
    
    }
}
