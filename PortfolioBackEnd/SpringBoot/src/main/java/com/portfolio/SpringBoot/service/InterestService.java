// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.DTO.DTOInterest;
import com.portfolio.SpringBoot.model.Interest;
import com.portfolio.SpringBoot.model.Person;
import com.portfolio.SpringBoot.repository.InterestRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class InterestService implements IInterestService {
    
    // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    @Autowired public InterestRepository interestRepo;
    @Autowired public IPersonService persServ;

    @Override
    public Interest crearInteres(Interest inter) {
        Long tmp_id = inter.getPerson().getId();
        Person pers = persServ.buscarPersona(tmp_id);
        
        if (pers != null) {
            inter.setPerson(pers);
        } 
       
        return interestRepo.save(inter);
 
    }

    @Override
    public void borrarInteres(Long id) {
        interestRepo.deleteById(id);
    }

    @Override
    public Interest buscarInteres(Long id) {
        return interestRepo.findById(id).orElse(null);
    }

    @Override
    public List<Interest> verIntereses() {
        return interestRepo.findAll(Sort.by("orderdeploy").ascending());
    }

    @Override
    public List<DTOInterest> verByPersonId(Long id) {
        //        Person pers = persServ.buscarPersona(id);
        List<Interest> listinter = interestRepo.findByPersonId(id);
        List listatemp = new ArrayList();
        
        for (Interest elemento :listinter) {
            DTOInterest tempDTO = new DTOInterest();

            tempDTO.setId(elemento.getId());
            tempDTO.setName(elemento.getName());
            tempDTO.setOrderdeploy(elemento.getOrderdeploy());
            
            listatemp.add(tempDTO);
        }
         
        
        return listatemp;
        
    }
    
    
    
}
