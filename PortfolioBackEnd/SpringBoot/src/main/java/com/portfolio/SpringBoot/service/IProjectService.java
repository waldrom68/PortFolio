// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Project;
import java.util.List;

public interface IProjectService {
    
    public List<Project> verProject();
    public void crearProject(Project proy);
    public void borrarProject(Long id);
    public Project buscarProject(Long id);
}
