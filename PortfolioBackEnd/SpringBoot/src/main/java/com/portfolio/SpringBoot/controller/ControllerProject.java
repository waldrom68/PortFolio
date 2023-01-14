// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.DTO.DTOProject;
import com.portfolio.SpringBoot.model.Project;
import com.portfolio.SpringBoot.service.IProjectService;
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
public class ControllerProject {
    
    //    Creamos la dependencia con el servicio
    @Autowired 
    private IProjectService projServ;
    
    
    @PostMapping ("/edit/project")  // edit and create
    public Project crearProject (@RequestBody Project proj) {
    
        return projServ.crearProject(proj);

    }
    
    @DeleteMapping ("/del/project/{id}")
    public void borrarProject (@PathVariable Long id) {
    
        projServ.borrarProject(id);
        
    }
    
//    @GetMapping ("/list/project/all")
//    public List<Project> verProject() {
//    
//        return projServ.verProject();
//    
//    }

    @GetMapping ("/list/project/{id}")
    public List<DTOProject> verByPerson(@PathVariable Long id) {
    
        return projServ.verByPersonId(id);
    
    }

}
