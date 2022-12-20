// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.model.SocialNetwork;
import com.portfolio.SpringBoot.service.ISocialnetworkService;
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
public class ControllerSocialNetwork {
    
    //    Creamos la dependencia con el servicio
    @Autowired
    private ISocialnetworkService socialServ;
    
    @PostMapping("/new/socialnetwork")
    public void crearSocial(@RequestBody SocialNetwork social) {
    
        socialServ.crearSocial(social);
    
    }
    
    @GetMapping ("/del/socialnetwork")
    public void borrarSocial (@PathVariable Long id) {
    
        socialServ.borrarSocial(id);
        
    }
    
    @PutMapping ("/edit/socialnetwork")
    public void editarSocial(@RequestBody SocialNetwork social) {
    
        socialServ.crearSocial(social);

    }
          
    @GetMapping ("/listar/social")
    public List<SocialNetwork> verSocial() {
    
    return socialServ.verSocial();
        
    }

}
