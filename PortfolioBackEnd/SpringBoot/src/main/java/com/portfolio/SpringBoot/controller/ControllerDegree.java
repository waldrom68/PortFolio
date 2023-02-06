// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.model.Degree;
import com.portfolio.SpringBoot.service.IDegreeService;
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
public class ControllerDegree {
    
    @Autowired
    private IDegreeService degreeRepo;
    
        
    @PostMapping ("/edit/degree")
    public Degree crearDegree (@RequestBody Degree degree) {
        return degreeRepo.crearDegree(degree);
    
    }
    
    @DeleteMapping ("/del/degree/{id}")
    public void borrarDegree (@PathVariable Long id) {
    
        degreeRepo.borrarDegree(id);
        
    }
    
//    @PutMapping ("/edit/degree")
//    public void editarDegree(@RequestBody Degree pers) {
//    
//        degreeRepo.crearDegree(pers);
//
//    }
           
//    @GetMapping ("/list/degree/all")
//    public List<Degree> verDegree() {
//    
//        return degreeRepo.verDegree();
//    
//    }
    
    @GetMapping ("/list/degree/{id}")
    public List<Degree> verByPersonId (@PathVariable Long id) {
    
        return degreeRepo.verByPersonId(id);
        
    }
}
