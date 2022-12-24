// Orden de creacion 5.-

package com.portfolio.SpringBoot.Controller;

import com.portfolio.DTO.DTOPerson;
import com.portfolio.SpringBoot.model.DisplayData;
import com.portfolio.SpringBoot.model.Person;
import com.portfolio.SpringBoot.service.IDisplayDataService;
import com.portfolio.SpringBoot.service.IPersonService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


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
    @ResponseBody
    public DTOPerson mostrarPersona(@PathVariable Long id) {
        Person persona = persoServ.buscarPersona(id);
        DTOPerson personaDTO = new DTOPerson();
        
        personaDTO.setId(persona.getId());
        personaDTO.setName(persona.getName());
        personaDTO.setLastName(persona.getLastName());
        
        return personaDTO;
    }
        
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
            pers.setDisplaydata(persona.getDisplaydata());
            
            System.out.println("Existe, asi que estoy modificando");
        }
        
        persoServ.crearPersona(pers);

       
    
    }
    
    @GetMapping ("/del/person/{id}")
    public void borrarPersona (@PathVariable Long id) {
    
        persoServ.borrarPersona(id);
//        throw new UnsupportedOperationException("Not allowed yet! sorry.."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
        
    }
    
    @GetMapping ("/list/person/all")
    public List<Person> verPersonas() {
        System.out.println("Llamo al Servicio");
        return persoServ.verPersonas();
    
    }

// Le quito visibilidad, esta funcionalidad es para uso interno.    
//    @GetMapping ("/find/person/{id}")
//    public Person buscarPersona(@PathVariable Long id) {
//        System.out.println("En el servicio, busco una persona");
//        return persoServ.buscarPersona(id);
//    
//    }
  
}
