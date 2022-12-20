// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Softskill;
import java.util.List;


public interface ISoftskillService {
    
    public List<Softskill> verSoft();
    public void crearSoft(Softskill soft);
    public void borrarSoft(Long id);
    public Softskill buscarSoft(Long id);
    
}
