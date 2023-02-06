// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.DTO.DTOHardskill;
import com.portfolio.SpringBoot.model.Hardskill;
import com.portfolio.SpringBoot.service.IHardskillService;
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
public class ControllerHardskill {
    
    //    Creamos la dependencia con el servicio
    @Autowired
    private IHardskillService hardServ;
    
    @PostMapping("/edit/hardskill")  // edit and create
    public Hardskill crearHard(@RequestBody Hardskill hard) {
    
        return hardServ.crearHard(hard);

        
    }
    
    @DeleteMapping ("/del/hardskill/{id}")
    public void borrarHard (@PathVariable Long id) {
    
        hardServ.borrarHard(id);
        
    }

    @GetMapping ("/list/hardskill/all")
    public List<Hardskill> verHard() {
    
        return hardServ.verHard();
    
    }

    @GetMapping ("/list/hardskill/{id}")
    public List<DTOHardskill> verByPerson(@PathVariable Long id) {
    
        return hardServ.verByPersonId(id);
    
    }


}
