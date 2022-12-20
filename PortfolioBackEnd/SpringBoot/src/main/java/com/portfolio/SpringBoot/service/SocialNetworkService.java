// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.SocialNetwork;
import com.portfolio.SpringBoot.repository.SocialNetworkRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SocialNetworkService implements ISocialnetworkService {

        // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    @Autowired
    public SocialNetworkRepository socialRepo;
    
    @Override
    public List<SocialNetwork> verSocial() {
        return socialRepo.findAll();
    }

    @Override
    public void crearSocial(SocialNetwork social) {
        socialRepo.save(social);
    }

    @Override
    public void borrarSocial(Long id) {
        socialRepo.deleteById(id);
    }

    @Override
    public SocialNetwork buscarSocial(Long id) {
        return socialRepo.findById(id).orElse(null);
    }
    
}
