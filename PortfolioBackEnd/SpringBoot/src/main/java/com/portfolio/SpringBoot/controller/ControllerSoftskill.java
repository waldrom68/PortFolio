// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.DTO.DTOSoftskill;
import com.portfolio.SpringBoot.model.Softskill;
import com.portfolio.SpringBoot.service.ISoftskillService;
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
public class ControllerSoftskill {
    
    //    Creamos la dependencia con el servicio
    @Autowired
    private ISoftskillService softServ;
    
    @PostMapping("/edit/softskill")  // edit and create
    public Softskill crearSoft(@RequestBody Softskill soft) {

        return softServ.crearSoft(soft);
    
    }
    
    @DeleteMapping ("/del/softskill/{id}")
    public void borrarSoft (@PathVariable Long id) {
    
        softServ.borrarSoft(id);
        
    }
    
//    @GetMapping ("/list/softskill/all")
//    public List<Softskill> verSoft() {
//    
//        return softServ.verSoft();
//    
//    }
    
    @GetMapping ("/list/softskill/{id}")
    public List<DTOSoftskill> verByPerson(@PathVariable Long id) {
    
        return softServ.verByPersonId(id);
    
    }

//    @GetMapping ("/list/softskill/{puntaje}")
//    public List<Softskill> verByAssesment(@PathVariable int puntaje) {
//    
//        return softServ.verByAssesment(puntaje);
//    
//    }

}

