// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.RoleList;
import com.portfolio.SpringBoot.repository.RoleListRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleListService implements IRoleListService{
    
    // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    @Autowired
    public RoleListRepository roleRepo;

    @Override
    public List<RoleList> verRolelist() {
        return roleRepo.findAll();
    }

    @Override
    public void crearRolelist(RoleList role) {
        roleRepo.save(role);
    }

    @Override
    public void borrarRolelist(Long id) {
        roleRepo.deleteById(id);
    }

    @Override
    public RoleList buscarRolelist(Long id) {
        return roleRepo.findById(id).orElse(null);
    }
    
}
