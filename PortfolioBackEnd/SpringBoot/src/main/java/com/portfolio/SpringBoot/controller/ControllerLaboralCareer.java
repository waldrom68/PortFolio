// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.model.LaboralCareer;
import com.portfolio.SpringBoot.service.ILaboralCareerService;
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
public class ControllerLaboralCareer {
    //    Creamos la dependencia con el servicio
    @Autowired 
    private ILaboralCareerService laboralServ;
    
    
    @PostMapping ("/new/laboralcareer")
    public void crearLaboralCareer (@RequestBody LaboralCareer pers) {
    
        laboralServ.crearLaboralCareer(pers);
    
    }
    
    @GetMapping ("/del/laboralcareer")
    public void borrarLaboralCareer (@PathVariable Long id) {
    
        laboralServ.borrarLaboralCareer(id);
        
    }
    
    @PutMapping ("/edit/laboralcareer")
    public void editarLaboralCareer(@RequestBody LaboralCareer pers) {
    
        laboralServ.crearLaboralCareer(pers);

    }
           
    @GetMapping ("/list/laboralcareer")
    public List<LaboralCareer> verLaboralCareer() {
    
        return laboralServ.verLaboralCareer();
    
    }
}
