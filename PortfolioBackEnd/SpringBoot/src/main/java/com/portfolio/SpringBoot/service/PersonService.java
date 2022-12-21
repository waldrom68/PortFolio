// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Person;
import com.portfolio.SpringBoot.repository.PersonRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService implements IPersonService {

    // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    @Autowired
    public PersonRepository persoRepo;
    
    @Override
    public List<Person> verPersonas() {
        System.out.println("Voy a buscar los datos al repositorio");
        return persoRepo.findAll();
    }

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
     
}
