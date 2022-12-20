// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.model.Hardskill;
import com.portfolio.SpringBoot.service.IHardskillService;
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
public class ControllerHardskill {
    
        //    Creamos la dependencia con el servicio
    @Autowired
    private IHardskillService hardServ;
    
    @PostMapping("/new/Hardskill")
    public void crearHard(@RequestBody Hardskill hard) {
    
        hardServ.crearHard(hard);
    
    }
    
    @GetMapping ("/del/Hardskill")
    public void borrarHard (@PathVariable Long id) {
    
        hardServ.borrarHard(id);
        
    }
    
    @PutMapping ("/edit/Hardskill")
    public void editarHard(@RequestBody Hardskill hard) {
    
        hardServ.crearHard(hard);

    }
           
    @GetMapping ("/list/Hardskill")
    public List<Hardskill> verHard() {
    
        return hardServ.verHard();
    
    }
}
