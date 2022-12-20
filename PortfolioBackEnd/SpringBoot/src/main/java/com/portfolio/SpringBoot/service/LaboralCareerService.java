// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.LaboralCareer;
import com.portfolio.SpringBoot.repository.LaboralCareerRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LaboralCareerService implements ILaboralCareerService {

        // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    @Autowired
    public LaboralCareerRepository laboralRepo;
    
    @Override
    public List<LaboralCareer> verLaboralCareer() {
        return laboralRepo.findAll();
    }

    @Override
    public void crearLaboralCareer(LaboralCareer laboral) {
        laboralRepo.save(laboral);
    }

    @Override
    public void borrarLaboralCareer(Long id) {
        laboralRepo.deleteById(id);
    }

    @Override
    public LaboralCareer buscarLaboralCareer(Long id) {
        return laboralRepo.findById(id).orElse(null);
    }
    
}
