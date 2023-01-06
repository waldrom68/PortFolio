// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.model.DisplayData;
import com.portfolio.SpringBoot.service.IDisplayDataService;
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
public class ControllerDisplay {
    
    //    Creamos la dependencia con el servicio
    @Autowired 
    private IDisplayDataService displayServ;
    
//    
//    @PostMapping ("/new/displaydata")
//    public void crearDisplayData (@RequestBody DisplayData display) {
//    
//        displayServ.crearDisplay(display);
//    
//    }
//    
//    @DeleteMapping ("/del/displaydata")
//    public void borrarDisplayData(@PathVariable Long id) {
//    
//        displayServ.borrarDisplay(id);
//        
//    }
    
    @PutMapping ("/edit/displaydata")
    public void editarDisplayData(@RequestBody DisplayData display) {
    
        displayServ.crearDisplay(display);

    }
           
    @GetMapping ("/list/displaydata")
    public List<DisplayData> verDisplayData() {
    
        return displayServ.verDisplay();
    
    }
    
}
