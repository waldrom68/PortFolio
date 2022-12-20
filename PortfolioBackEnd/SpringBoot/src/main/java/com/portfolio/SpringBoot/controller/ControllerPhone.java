// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

// Recibe las peticiones y delega el negocio (es el pivot de la aplicacion)

import com.portfolio.SpringBoot.model.Phone;
import com.portfolio.SpringBoot.service.IPhoneService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControllerPhone {
  
    //    Creamos la dependencia con el servicio
    @Autowired 
    private IPhoneService phoneServ;
    
       
    @PostMapping ("/new/phone")
    public void crearPhone (@RequestBody Phone phone) {
    
        phoneServ.crearPhone(phone);
    
    }
    
    @GetMapping ("/del/phone")
    public void borrarPhone (@PathVariable Long id) {
    
        phoneServ.borrarPhone(id);
        
    }
    
    @PutMapping ("/edit/phone")
    public void editarPhone(@RequestBody Phone pers) {
    
        phoneServ.crearPhone(pers);

    }
           
    @GetMapping ("/list/phone")
    public List<Phone> verPhone() {
    
        return phoneServ.verPhones();
    
    } 
}
