// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.repository.PhoneRepository;
import com.portfolio.SpringBoot.model.Phone;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PhoneService implements IPhoneService {

    // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    @Autowired
    public PhoneRepository phoneRepo;
    
    @Override
    public List<Phone> verPhones() {
        return phoneRepo.findAll();
    }

    @Override
    public void crearPhone(Phone phone) {
        phoneRepo.save(phone);
    }

    @Override
    public void borrarPhone(Long id) {
        phoneRepo.deleteById(id);
    }

    @Override
    public Phone buscarPhone(Long id) {
        return phoneRepo.findById(id).orElse(null);
    }
    
    
}
