// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.DTO.DTOInterest;
import com.portfolio.SpringBoot.model.Interest;
import com.portfolio.SpringBoot.service.IInterestService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControllerInterest {
    //    Creamos la dependencia
    @Autowired
    private IInterestService interServ;
   
    @PostMapping("/edit/interest")
    public Interest crearInteres(@RequestBody Interest inter) {
    
        return interServ.crearInteres(inter);
    
    }
    
    @DeleteMapping ("/del/interest/{id}")
    public void borrarInteres(@PathVariable Long id) {
    
        interServ.borrarInteres(id);
    
    }

//    @GetMapping ("/list/interest/all")
//    public List<Interest> listarInteres() {
//    
//        return interServ.verIntereses();
//    
//    }
    
    @GetMapping ("/list/interest/{id}")
    public List<DTOInterest> verByPerson(@PathVariable Long id) {
    
        return interServ.verByPersonId(id);
    
    }
    
}
