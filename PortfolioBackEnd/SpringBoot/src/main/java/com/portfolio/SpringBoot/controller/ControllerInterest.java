// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.model.Interest;
import com.portfolio.SpringBoot.service.IInterestService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControllerInterest {
    //    Creamos la dependencia
    @Autowired
    private IInterestService interServ;
   
    @PostMapping("/new/interest")
    public void crearInteres(@RequestBody Interest inter) {
    
        interServ.crearInteres(inter);
    
    }
    
    @GetMapping ("/del/interest")
    public void borrarInteres(@RequestBody Long id) {
    
        interServ.borrarInteres(id);
    
    }
    
    @PutMapping ("/edit/interest")
    public void editarInteres(@RequestBody Interest inter) {
    
        interServ.crearInteres(inter);
    
    }
    
    @GetMapping ("/list/interest")
    public List<Interest> listarInteres() {
    
        return interServ.verIntereses();
    
    }
    
}
