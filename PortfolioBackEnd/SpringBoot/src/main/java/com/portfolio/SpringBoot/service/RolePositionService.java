// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.RolePosition;
import com.portfolio.SpringBoot.repository.RolePositionRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolePositionService implements IRolePositionService {
    
    @Autowired
    public RolePositionRepository positionRepo;

    @Override
    public void crearRolePosition(RolePosition position) {
        positionRepo.save(position);
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
}
