// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.DTO.DTOOrganization;
import com.portfolio.SpringBoot.model.Organization;
import com.portfolio.SpringBoot.model.Person;
import com.portfolio.SpringBoot.repository.OrganizationRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrganizationService implements IOrganizationService {

    @Autowired
    public OrganizationRepository orgaRepo;
    @Autowired public IPersonService persServ;
    
    @Override
    public Organization crearOrganizacion(Organization orga) {
        Long tmp_id = orga.getPerson().getId();
        Person pers = persServ.buscarPersona(tmp_id);
        if (pers != null ) {
            orga.setPerson(pers);
            
        } 

        return orgaRepo.save(orga);
    }

    @Override
    public void borrarOrganizacion(Long id) {
        orgaRepo.deleteById(id);
    }

    @Override
    public Organization buscarOrganizacion(Long id) {
        return orgaRepo.findById(id).orElse(null);
    }
    
    @Override
    public List<Organization> verOrganizacion() {
        return orgaRepo.findAll();
    }

    @Override
    public List<Organization> verByPersonId(Long id) {
        List<Organization> listorga = orgaRepo.findByPersonId(id);
        List listatemp = new ArrayList();
        
        for (Organization elemento: listorga) {
            DTOOrganization tempDTO = new DTOOrganization();
            
            tempDTO.setId(elemento.getId());
            tempDTO.setName(elemento.getName());
            tempDTO.setResume(elemento.getResume());
            tempDTO.setUrl(elemento.getUrl());
            
            listatemp.add(tempDTO);
        
                   
        }
        
        return listatemp;
     }

}
