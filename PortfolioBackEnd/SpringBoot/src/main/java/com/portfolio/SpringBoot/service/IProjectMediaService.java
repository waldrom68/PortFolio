// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.ProjectMedia;
import java.util.List;

public interface IProjectMediaService {
        
    public List<ProjectMedia> verProjectMedia();
    public void crearProjectMedia(ProjectMedia per);
    public void borrarProjectMedia(Long id);
    public ProjectMedia buscarProjectMedia(Long id);
}
