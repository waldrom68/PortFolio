// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Degree;
import java.util.List;


public interface IDegreeService {
    
    public List<Degree> verDegree();
    public void crearDegree(Degree deg);
    public void borrarDegree(Long id);
    public Degree buscarDegree(Long id);
    
}
