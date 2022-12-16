
package com.portfolio.SpringBoot.Controller;

import com.portfolio.SpringBoot.model.Person;
import com.portfolio.SpringBoot.service.IPersonService;
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
public class Controller {
//    List<Person> listaPersonas = new ArrayList();
    
//    Creamos la dependencia
    @Autowired 
    private IPersonService persoServ;
    
    @PostMapping ("/new/person")
    public void crearPersona (@RequestBody Person pers) {
    
        persoServ.crearPersona(pers);
    
    }
    
    @GetMapping ("/del/person")
    public void borrarPersona (@PathVariable Long id) {
    
        persoServ.borrarPersona(id);
        
    }
    
    @PutMapping ("/edit/person")
    public void editarPersona(@RequestBody Person pers) {
    
        persoServ.crearPersona(pers);

    }
           
    @GetMapping ("/list/person")
    public List<Person> verPersonas() {
    
        return persoServ.verPersonas();
    
    }
    
    
//    
//    @GetMapping ("/hola")
//    public String decirHola() {
//        //localhost:8080/hola
//        return "<h1>hola mundo</h1>";
//    }
//    
//    // pasar parametros via la URL  
//    @PostMapping ("/chau")
//    public String decirChau(@RequestParam String nombre) {
//        //localhost:8080/chau?nombre=Walter
//        return "Chau... chau.." + nombre ;
//    }
    
    
}
