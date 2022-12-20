// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Project;
import com.portfolio.SpringBoot.repository.ProjectRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService implements IProjectService {
    // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    @Autowired
    public ProjectRepository projRepo;

    @Override
    public List<Project> verProject() {
        return projRepo.findAll();
    }

    @Override
    public void crearProject(Project proy) {
        projRepo.save(proy);
    }

    @Override
    public void borrarProject(Long id) {
        projRepo.deleteById(id);
    }

    @Override
    public Project buscarProject(Long id) {
        return projRepo.findById(id).orElse(null);
    }
    
}
