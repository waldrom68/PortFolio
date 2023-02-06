// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.DTO.DTOProject;
import com.portfolio.SpringBoot.model.Person;
import com.portfolio.SpringBoot.model.Project;
import com.portfolio.SpringBoot.repository.ProjectRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class ProjectService implements IProjectService {
    // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    
    
  
    @Autowired public ProjectRepository projRepo;
    @Autowired public IPersonService persServ;


    @Override
    public Project crearProject(Project proy) {
        Long tmp_id = proy.getPerson().getId();
        Person pers = persServ.buscarPersona(tmp_id);
        
        if (pers != null) {
            proy.setPerson(pers);
        } 
        
        return projRepo.save(proy);

    }

    @Override
    public void borrarProject(Long id) {
        projRepo.deleteById(id);
    }

    @Override
    public Project buscarProject(Long id) {
        return projRepo.findById(id).orElse(null);
    }
    
    @Override
    public List<Project> verProject() {
        return projRepo.findAll(Sort.by("orderdeploy").descending());
    }

    @Override
    public List<DTOProject> verByPersonId(Long id) {
      //        Person pers = persServ.buscarPersona(id);
        List<Project> listproj = projRepo.findByPersonId(id);
        List listatemp = new ArrayList();
        
        for (Project elemento :listproj) {
            DTOProject tempDTO = new DTOProject();
            
            tempDTO.setId(elemento.getId());
            tempDTO.setName(elemento.getName());
            tempDTO.setResume(elemento.getResume());
            String temp = elemento.getSince().toString();
            
            tempDTO.setSince(temp.substring(0, 10));
            tempDTO.setOrderdeploy(elemento.getOrderdeploy());
            tempDTO.setUrl(elemento.getUrl());
            
            listatemp.add(tempDTO);
        }
         
        
        return listatemp;

    }  
    
}
