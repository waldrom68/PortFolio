// Orden de creacion 2.-

package com.portfolio.service;

import com.portfolio.model.LaboralCareer;
import java.util.List;


public interface ILaboralCareerService {
    
    public LaboralCareer crearLaboralCareer(LaboralCareer labor);
    public void borrarLaboralCareer(Long id);
    public LaboralCareer buscarLaboralCareer(Long id);
    
    public List<LaboralCareer> verLaboralCareer();
    public List<LaboralCareer> verByPersonId(Long id);
    
}
