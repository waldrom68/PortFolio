// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.ProjectMedia;
import com.portfolio.SpringBoot.repository.ProjectMediaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectMediaService implements IProjectMediaService {

    // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    @Autowired
    public ProjectMediaRepository projMediaRepo;
       
    
    @Override
    public List<ProjectMedia> verProjectMedia() {
        return projMediaRepo.findAll();
    }

    @Override
    public ProjectMedia crearProjectMedia(ProjectMedia media) {
        return projMediaRepo.save(media);
    }

    @Override
    public void borrarProjectMedia(Long id) {
        projMediaRepo.deleteById(id);
    }

    @Override
    public ProjectMedia buscarProjectMedia(Long id) {
        return projMediaRepo.findById(id).orElse(null);
    }
    
}
