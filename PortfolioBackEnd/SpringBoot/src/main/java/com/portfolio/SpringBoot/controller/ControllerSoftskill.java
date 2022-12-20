// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.model.Softskill;
import com.portfolio.SpringBoot.service.ISoftskillService;
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
public class ControllerSoftskill {
    
    //    Creamos la dependencia con el servicio
    @Autowired
    private ISoftskillService softServ;
    
    @PostMapping("/new/softskill")
    public void crearSoft(@RequestBody Softskill soft) {
    
        softServ.crearSoft(soft);
    
    }
    
    @GetMapping ("/del/softskill")
    public void borrarSoft (@PathVariable Long id) {
    
        softServ.borrarSoft(id);
        
    }
    
    @PutMapping ("/edit/softskill")
    public void editarSoft(@RequestBody Softskill soft) {
    
        softServ.crearSoft(soft);

    }
           
    @GetMapping ("/list/softskill")
    public List<Softskill> verHard() {
    
        return softServ.verSoft();
    
    }
    
}
