// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.DTO.DTORolePosition;
import com.portfolio.SpringBoot.model.Person;
import com.portfolio.SpringBoot.model.RolePosition;
import com.portfolio.SpringBoot.repository.RolePositionRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolePositionService implements IRolePositionService {
    
    @Autowired
    public RolePositionRepository positionRepo;
    @Autowired public IPersonService persServ;

    @Override
    public RolePosition crearRolePosition(RolePosition position) {
        Long tmp_id = position.getPerson().getId();
        Person pers = persServ.buscarPersona(tmp_id);
        if (pers != null ) {
            position.setPerson(pers);
            positionRepo.save(position);
        } 
        return positionRepo.save(position);
    }

    @Override
    public void borrarRolePosition(Long id) {
        positionRepo.deleteById(id);
    }

    @Override
    public RolePosition buscarRolePosition(Long id) {
        return positionRepo.findById(id).orElse(null);
    }
    
    @Override
    public List<RolePosition> verRolePosition() {
        return positionRepo.findAll();
    }

    @Override
    public List<RolePosition> verByPersonId(Long id) {
        List<RolePosition> listrole = positionRepo.findByPersonId(id);
        List listatemp = new ArrayList();
        
        for (RolePosition elemento : listrole) {
            DTORolePosition tempDTO = new DTORolePosition();
       
            tempDTO.setId(elemento.getId());
            tempDTO.setName(elemento.getName());
            
            listatemp.add(tempDTO);
        }
        
        return listatemp;
    }
}
