// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;
import com.portfolio.SpringBoot.model.Studie;
import com.portfolio.SpringBoot.service.IStudieService;
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
public class ControllerStudie {
    //    Creamos la dependencia con el servicio
    @Autowired 
    private IStudieService studieServ;
    
        
    @PostMapping ("/new/studie")
    public void crearStudie (@RequestBody Studie studie) {
    
        studieServ.crearStudie(studie);
    
    }
    
    @GetMapping ("/del/studie")
    public void borrarStudie (@PathVariable Long id) {
    
        studieServ.borrarStudie(id);
        
    }
    
    @PutMapping ("/edit/studie")
    public void editarStudie(@RequestBody Studie studie) {
    
        studieServ.crearStudie(studie);

    }
           
    @GetMapping ("/list/studie")
    public List<Studie> verStudie() {
    
        return studieServ.verStudie();
    
    }
}
    