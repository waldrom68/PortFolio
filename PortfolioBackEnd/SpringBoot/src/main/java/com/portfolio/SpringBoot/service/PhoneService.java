// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.DTO.DTOPhone;
import com.portfolio.SpringBoot.model.Person;
import com.portfolio.SpringBoot.repository.PhoneRepository;
import com.portfolio.SpringBoot.model.Phone;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class PhoneService implements IPhoneService {

    // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    @Autowired public PhoneRepository phoneRepo;
    @Autowired public IPersonService persServ;
    

    @Override
    public Phone crearPhone(Phone phone) {
        Long tmp_id = phone.getPerson().getId();
        Person pers = persServ.buscarPersona(tmp_id);
        
        if (pers != null) {
            phone.setPerson(pers);
        }
        
        return phoneRepo.save(phone);
    }

    @Override
    public void borrarPhone(Long id) {
        phoneRepo.deleteById(id);
    }

    @Override
    public Phone buscarPhone(Long id) {
        return phoneRepo.findById(id).orElse(null);
    }
    
    @Override
    public List<Phone> verPhones() {
        return phoneRepo.findAll(Sort.by("orderdeploy").ascending());
    }

    @Override
    public List<DTOPhone> verByPersonId(Long id) {
        //        Person pers = persServ.buscarPersona(id);
        List<Phone> listsoft = phoneRepo.findByPersonId(id);
        List listatemp = new ArrayList();
        
        for (Phone elemento :listsoft) {
            DTOPhone tempDTO = new DTOPhone();

            tempDTO.setId(elemento.getId());
            tempDTO.setDescription(elemento.getDescription());
            tempDTO.setNumber(elemento.getNumber());
            tempDTO.setOrderdeploy(elemento.getOrderdeploy());
            
            listatemp.add(tempDTO);
        }
         
        
        return listatemp;
    }
    
}
