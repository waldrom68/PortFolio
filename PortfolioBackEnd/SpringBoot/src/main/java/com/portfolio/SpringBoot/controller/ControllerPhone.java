// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

// Recibe las peticiones y delega el negocio (es el pivot de la aplicacion)

import com.portfolio.SpringBoot.DTO.DTOPhone;
import com.portfolio.SpringBoot.model.Phone;
import com.portfolio.SpringBoot.service.IPhoneService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControllerPhone {
  
    //    Creamos la dependencia con el servicio
    @Autowired 
    private IPhoneService phoneServ;
    
       
    @PostMapping ("/edit/phone")
    public Phone crearPhone (@RequestBody Phone phone) {
        return phoneServ.crearPhone(phone);

    }
    
   
    @PostMapping ("/del/phone/{id}")
    public void borrarPhone (@PathVariable Long id) {
    
        phoneServ.borrarPhone(id);
        
    }
    
    @GetMapping ("/list/phone/all")
    public List<Phone> verPhone() {
    
        return phoneServ.verPhones();
    
    }
    
    @GetMapping ("/list/phone/{id}")
    public List<DTOPhone> verByPerson(@PathVariable Long id) {
    
        return phoneServ.verByPersonId(id);
    
    } 
}
