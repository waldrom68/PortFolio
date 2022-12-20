// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Organization;
import com.portfolio.SpringBoot.repository.OrganizationRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrganizationService implements IOrganizationService {

    @Autowired
    public OrganizationRepository orgaRepo;
    
    @Override
    public List<Organization> verOrganizacion() {
        return orgaRepo.findAll();
    }

    @Override
    public void crearOrganizacion(Organization orga) {
        orgaRepo.save(orga);
    }

    @Override
    public void borrarOrganizacion(Long id) {
        orgaRepo.deleteById(id);
    }

    @Override
    public Organization buscarOrganizacion(Long id) {
        return orgaRepo.findById(id).orElse(null);
    }
    
}
