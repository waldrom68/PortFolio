// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;

import com.portfolio.SpringBoot.DTO.DTOPerson;
import com.portfolio.SpringBoot.model.DisplayData;
import com.portfolio.SpringBoot.model.Person;
import com.portfolio.SpringBoot.service.IDisplayDataService;
import com.portfolio.SpringBoot.service.IPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.bind.annotation.ResponseBody;


// Recibe las peticiones y delega el negocio (es el pivot de la aplicacion)
@RestController
public class ControllerPerson {
//    List<Person> listaPersonas = new ArrayList();
    
//    Creamos la dependencia con el servicio
    @Autowired 
    private IPersonService persoServ;
    @Autowired
    private IDisplayDataService displayServ;

  
    @GetMapping("/view/person/{id}")
    public DTOPerson mostrarPersona(@PathVariable Long id) {
        return persoServ.verPersona(id);
    }
     
    @CrossOrigin
    @PostMapping ("/edit/person")  // edit and create Person
    public void crearPersona (@RequestBody Person pers) {
        System.out.println(pers.toString());
        Person persona = persoServ.buscarPersona(pers.getId());
        
        if ( persona == null ) {
            System.out.println("No existia, creando una persona");

            // Creo la instancia DisplayData que tienen por default todas las personas
            DisplayData temp = new DisplayData();
            // Fuerzo su guardado en el repositorio para obtener el id asignado
            DisplayData guardada = displayServ.crearForceDisplay(temp);
            // Vinculo ambas instancias
            // Guardando la instancia con su respectiva relacion OneToOne con DisplayData
            pers.setDisplaydata(guardada);


        } else {

            pers.setPassword(persona.getPassword());
            pers.setDisplaydata(persona.getDisplaydata());
            System.out.println("Existe, asi que estoy modificando todos los atributos menos la clave, la cual no viaja en el body");
           
        }
        
        persoServ.crearPersona(pers);

       
    
    }
    
    
    
// Le quito esta funcionalidad, no va a dar altas ni bajas desde el frontEnd.
//    @GetMapping ("/del/person/{id}")
//    public void borrarPersona (@PathVariable Long id) {
//    
//        persoServ.borrarPersona(id);
//
//    }
    
// Le quito visibilidad, esta funcionalidad es para uso interno.    
//    @GetMapping ("/find/person/{id}")
//    public Person buscarPersona(@PathVariable Long id) {
//        System.out.println("En el servicio, busco una persona");
//        return persoServ.buscarPersona(id);
//    
//    }
  
}
