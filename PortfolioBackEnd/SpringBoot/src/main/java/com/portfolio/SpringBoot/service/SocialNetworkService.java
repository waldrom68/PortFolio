// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.DTO.DTOSocialNetwork;
import com.portfolio.SpringBoot.model.Person;
import com.portfolio.SpringBoot.model.SocialNetwork;
import com.portfolio.SpringBoot.repository.SocialNetworkRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class SocialNetworkService implements ISocialnetworkService {

        // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    @Autowired public SocialNetworkRepository socialRepo;
    @Autowired public IPersonService persServ;


    @Override
    public SocialNetwork crearSocial(SocialNetwork social) {
        Long tmp_id = social.getPerson().getId();
        Person pers = persServ.buscarPersona(tmp_id);
        
        if (pers != null) {
            social.setPerson(pers);
        
        }
        
        return socialRepo.save(social);
    }

    @Override
    public void borrarSocial(Long id) {
        socialRepo.deleteById(id);
    }

    @Override
    public SocialNetwork buscarSocial(Long id) {
        return socialRepo.findById(id).orElse(null);
    }
        
    @Override
    public List<SocialNetwork> verSocial() {
        return socialRepo.findAll(Sort.by("orderdeploy").ascending());
    }

    @Override
    public List<DTOSocialNetwork> verByPersonId(Long id) {
        List<SocialNetwork> listsocial = socialRepo.findByPersonId(id);
        List listatemp = new ArrayList();
        
        for (SocialNetwork elemento :listsocial) {
            DTOSocialNetwork tempDTO = new DTOSocialNetwork();

            tempDTO.setId(elemento.getId());
            tempDTO.setName(elemento.getName());
            tempDTO.setPathIcon(elemento.getPathIcon());
            tempDTO.setUrl(elemento.getUrl());
            tempDTO.setOrderdeploy(elemento.getOrderdeploy());
            
            listatemp.add(tempDTO);
        }
         
        
        return listatemp;
    }
    
}
