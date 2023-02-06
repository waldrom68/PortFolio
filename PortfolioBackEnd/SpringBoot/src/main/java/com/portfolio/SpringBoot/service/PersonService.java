// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.DTO.DTOPerson;
import com.portfolio.SpringBoot.model.Person;
import com.portfolio.SpringBoot.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService implements IPersonService {

    // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    @Autowired
    public PersonRepository persoRepo;
    
    
//        Codigo que tengo que sacar del controller y debo colocar aqui por ser una regla de negocio
//        @Autowired
//        private IDisplayDataService displayServ;
//
//        public void crearPersona (@RequestBody Person pers) {

//        Person persona = persoServ.buscarPersona(pers.getId());
//        if ( persona == null ) {  //  No existia, creando una persona
//            Creo la instancia DisplayData que tienen por default todas las personas
//            DisplayData temp = new DisplayData();
//            // Fuerzo su guardado en el repositorio para obtener el id asignado
//            DisplayData guardada = displayServ.crearForceDisplay(temp);
//
//            // Vinculo ambas instancias
//            // Guardando la instancia con su respectiva relacion OneToOne con DisplayData
//            pers.setDisplaydata_id(guardada);
//        } else {
//            pers.setDisplaydata_id(persona.getDisplaydata_id());
//            System.out.println("Existe, asi que estoy modificando");
//        }
//        persoServ.crearPersona(pers);
//    }
    
     
    

    @Override
    public Person crearPersona(Person per) {
        return persoRepo.save(per);
    }

    @Override
    public void borrarPersona(Long id) {
        persoRepo.deleteById(id);
    }

    @Override
    public Person buscarPersona(Long id) {
        return persoRepo.findById(id).orElse(null);
    }

//    @Override
//    public void editPersona(Person per) {
//        persoRepo.save(per);
//    }
         
    @Override
    public DTOPerson verPersona(Long id) {
      //        Person pers = persServ.buscarPersona(id);
        Person tempper = persoRepo.findById(id).orElse(null);


        DTOPerson tempDTO = new DTOPerson();

        tempDTO.setId(tempper.getId());
        tempDTO.setName(tempper.getName());
        tempDTO.setLastName(tempper.getLastName());
        tempDTO.setPathFoto(tempper.getPathFoto());
        tempDTO.setLocation(tempper.getLocation());
        tempDTO.setProfession(tempper.getProfession());
        tempDTO.setProfile(tempper.getProfile());
        tempDTO.setObjetive(tempper.getObjetive());
        String temp = tempper.getSince().toString();

        tempDTO.setSince(temp.substring(0, 10));
        tempDTO.setEmail(tempper.getEmail());
        tempDTO.setUsername(tempper.getUsername());
        tempDTO.setDisplaydata(tempper.getDisplaydata());

        
        return tempDTO;

    }
}
