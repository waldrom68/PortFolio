// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.model.Project;
import com.portfolio.SpringBoot.service.IProjectService;
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
public class ControllerProject {
    
    //    Creamos la dependencia con el servicio
    @Autowired 
    private IProjectService projServ;
    
    
    @PostMapping ("/new/project")
    public void crearProject (@RequestBody Project proj) {
    
        projServ.crearProject(proj);
    
    }
    
    @GetMapping ("/del/project")
    public void borrarProject (@PathVariable Long id) {
    
        projServ.borrarProject(id);
        
    }
    
    @PutMapping ("/edit/project")
    public void editarProject(@RequestBody Project proj) {
    
        projServ.crearProject(proj);

    }
           
    @GetMapping ("/list/project")
    public List<Project> verProject() {
    
        return projServ.verProject();
    
    }
}
