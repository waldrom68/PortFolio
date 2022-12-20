// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.model.RoleList;
import com.portfolio.SpringBoot.service.IRoleListService;
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
public class ControllerRoleList {
    //    Creamos la dependencia con el servicio
    @Autowired 
    private IRoleListService roleServ;
    
    
    @PostMapping ("/new/rolelist")
    public void crearRoleList (@RequestBody RoleList role) {
    
        roleServ.crearRolelist(role);
    
    }
    
    @GetMapping ("/del/rolelist")
    public void borrarRolelist (@PathVariable Long id) {
    
        roleServ.borrarRolelist(id);
        
    }
    
    @PutMapping ("/edit/rolelist")
    public void editarRolelist(@RequestBody RoleList role) {
    
        roleServ.crearRolelist(role);

    }
           
    @GetMapping ("/list/rolelist")
    public List<RoleList> verRoleList() {
    
        return roleServ.verRolelist();
    
    }
}
