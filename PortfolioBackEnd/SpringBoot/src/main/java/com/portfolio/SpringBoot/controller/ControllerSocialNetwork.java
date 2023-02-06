// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.DTO.DTOSocialNetwork;
import com.portfolio.SpringBoot.model.SocialNetwork;
import com.portfolio.SpringBoot.service.ISocialnetworkService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


// Recibe las peticiones y delega el negocio (es el pivot de la aplicacion)
@RestController
public class ControllerSocialNetwork {
    
    //    Creamos la dependencia con el servicio
    @Autowired
    private ISocialnetworkService socialServ;
    
    @PostMapping("/edit/social")
    public SocialNetwork crearSocial(@RequestBody SocialNetwork social) {
    
        return socialServ.crearSocial(social);
    
    }
    
    @DeleteMapping ("/del/social/{id}")
    public void borrarSocial (@PathVariable Long id) {
    
        socialServ.borrarSocial(id);
        
    }
    
//    @GetMapping ("/list/social/all")
//    public List<SocialNetwork> verSocial() {
//    
//    return socialServ.verSocial();
//        
//    }
    
    @GetMapping ("/list/social/{id}")
    public List<DTOSocialNetwork> verByPerson(@PathVariable Long id){
    
    return socialServ.verByPersonId(id);
        
    }

}
