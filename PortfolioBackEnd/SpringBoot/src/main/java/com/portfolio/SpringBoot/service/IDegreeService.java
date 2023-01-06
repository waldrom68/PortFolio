// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Degree;
import java.util.List;


public interface IDegreeService {
    
    public Degree crearDegree(Degree deg);
    public void borrarDegree(Long id);
    public Degree buscarDegree(Long id);
    
    public List<Degree> verDegree();
    public List<Degree> verByPersonId(Long id);
    
}
