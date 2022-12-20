// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Softskill;
import com.portfolio.SpringBoot.repository.SoftskillRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class SoftskillService implements ISoftskillService {
    
    // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    @Autowired
    public SoftskillRepository softRepo;

    
    @Override
    public List<Softskill> verSoft() {
        return softRepo.findAll();
    }

    @Override
    public void crearSoft(Softskill soft) {
        softRepo.save(soft);
    }

    @Override
    public void borrarSoft(Long id) {
        softRepo.deleteById(id);
    }

    @Override
    public Softskill buscarSoft(Long id) {
        return softRepo.findById(id).orElse(null);
    }
    
    
    
}
