// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.model.ProjectMedia;
import com.portfolio.SpringBoot.service.IProjectMediaService;
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
public class ControllerProjectMedia {
    //    Creamos la dependencia con el servicio
    @Autowired 
    private IProjectMediaService persoServ;
    
    
    @PostMapping ("/new/projectmedia")
    public ProjectMedia crearProjectMedia (@RequestBody ProjectMedia pers) {
    
        return persoServ.crearProjectMedia(pers);
    
    }
    
    @DeleteMapping ("/del/projectmedia")
    public void borrarProjectMedia (@PathVariable Long id) {
    
        persoServ.borrarProjectMedia(id);
        
    }
    
//    @PutMapping ("/edit/projectmedia")
//    public void editarProjectMedia(@RequestBody ProjectMedia pers) {
//    
//        persoServ.crearProjectMedia(pers);
//
//    }
           
    @GetMapping ("/list/projectmedia")
    public List<ProjectMedia> verProjectMedia() {
    
        return persoServ.verProjectMedia();
    
    }
//    PENDIENTE BUSCAR SOLO LOS QUE PERTENENCEN AL ID DEL PROYECTO
}
