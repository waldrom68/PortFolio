// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Interest;
import com.portfolio.SpringBoot.repository.InterestRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InterestService implements IInterestService {
    
    // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    @Autowired
    public InterestRepository interestRepo;

    @Override
    public List<Interest> verIntereses() {
        return interestRepo.findAll();
    }

    @Override
    public void crearInteres(Interest inter) {
        interestRepo.save(inter);
    }

    @Override
    public void borrarInteres(Long id) {
        interestRepo.deleteById(id);
    }

    @Override
    public Interest buscarInteres(Long id) {
        return interestRepo.findById(id).orElse(null);
    }
    
    
    
}
