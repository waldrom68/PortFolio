// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Studie;
import com.portfolio.SpringBoot.repository.StudieRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudieService implements IStudieService {

        // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    @Autowired
    public StudieRepository studieRepo;
    
    @Override
    public List<Studie> verStudie() {
        return studieRepo.findAll();
    }

    @Override
    public void crearStudie(Studie studie) {
        studieRepo.save(studie);
    }

    @Override
    public void borrarStudie(Long id) {
        studieRepo.deleteById(id);
    }

    @Override
    public Studie buscarStudie(Long id) {
        return studieRepo.findById(id).orElse(null);
    }
    
}
