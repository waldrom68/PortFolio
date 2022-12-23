// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.model.RolePosition;
import com.portfolio.SpringBoot.service.IRolePositionService;
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
public class ControllerRolePosition {
    //    Creamos la dependencia con el servicio
    @Autowired 
    private IRolePositionService persoServ;
    
    
    @PostMapping ("/edit/roleposition")
    public void crearRolePosition (@RequestBody RolePosition post) {
    
        persoServ.crearRolePosition(post);
    
    }
    
    @PostMapping ("/del/roleposition/{id}")
    public void borrarPersona (@PathVariable Long id) {
    
        persoServ.borrarRolePosition(id);
        
    }
    
    @GetMapping ("/list/roleposition/all")
    public List<RolePosition> verRolePosition() {
    
        return persoServ.verRolePosition();
    
    }
    
}
