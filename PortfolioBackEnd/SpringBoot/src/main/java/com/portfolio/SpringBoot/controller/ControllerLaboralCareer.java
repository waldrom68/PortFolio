// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.model.LaboralCareer;
import com.portfolio.SpringBoot.service.ILaboralCareerService;
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
public class ControllerLaboralCareer {
    //    Creamos la dependencia con el servicio
    @Autowired 
    private ILaboralCareerService laboralServ;
    
    
    @PostMapping ("/edit/laboralcareer")
    public LaboralCareer crearLaboralCareer (@RequestBody LaboralCareer pers) {
        return laboralServ.crearLaboralCareer(pers);
    
    }
    
    @DeleteMapping ("/del/laboralcareer/{id}")
    public void borrarLaboralCareer (@PathVariable Long id) {
    
        laboralServ.borrarLaboralCareer(id);
        
    }
    
//    @GetMapping ("/list/laboralcareer/all")
//    public List<LaboralCareer> verLaboralCareer() {
//    
//        return laboralServ.verLaboralCareer();
//    
//    }
    
    @GetMapping ("/list/laboralcareer/{id}")
    public List<LaboralCareer> verByPersonId(@PathVariable Long id) {
    
        return laboralServ.verByPersonId(id);
    
    }
    
}
