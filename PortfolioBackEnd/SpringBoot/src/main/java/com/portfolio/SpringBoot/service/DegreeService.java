// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Degree;
import com.portfolio.SpringBoot.model.Person;
import com.portfolio.SpringBoot.repository.DegreeRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DegreeService implements IDegreeService {

    // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    @Autowired
    public DegreeRepository degreeRepo;
    @Autowired public IPersonService persServ;
    
    @Override
    public boolean crearDegree(Degree deg) {
        Long tmp_id = deg.getPerson().getId();
        Person pers = persServ.buscarPersona(tmp_id);
        if (pers != null ) {
            deg.setPerson(pers);
            degreeRepo.save(deg);
        } else {
            return false;
        }
        return true;
    }

    @Override
    public void borrarDegree(Long id) {
        degreeRepo.deleteById(id);
    }

    @Override
    public Degree buscarDegree(Long id) {
        return degreeRepo.findById(id).orElse(null);
    }
    
    @Override
    public List<Degree> verDegree() {
        return degreeRepo.findAll();
    }

    @Override
    public List<Degree> verByPersonId(Long id) {
        return degreeRepo.findByPersonId(id);
    }
}
