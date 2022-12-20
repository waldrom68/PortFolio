
package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.model.PortfolioSetting;
import com.portfolio.SpringBoot.service.IPortfolioSetting;
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
public class ControllerSetting {
    
    //    Creamos la dependencia
    @Autowired
    private IPortfolioSetting portServ;
    
    
    @PostMapping("/new/portfoliosetting") 
    public void crearPortSetting(@RequestBody PortfolioSetting port) {
        
        portServ.crearPSett(port);
        
    }
    
    @GetMapping ("/del/portfoliosetting")
    public void borrarPSett(@PathVariable Long id) {
    
    portServ.borrarPSett(id);
    
    }
    
    @PutMapping ("/edit/portfoliosetting")
    public void editarPSett(@RequestBody PortfolioSetting port) {
    
    portServ.crearPSett(port);
        
    }
    
    @GetMapping ("/list/portfoliosetting")
    public List<PortfolioSetting> verPSett() {
    
    return portServ.verPSett();
    
    }
    
}
