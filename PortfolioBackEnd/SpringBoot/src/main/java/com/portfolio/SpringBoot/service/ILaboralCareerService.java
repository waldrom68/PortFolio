// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.LaboralCareer;
import java.util.List;


public interface ILaboralCareerService {
    
    public List<LaboralCareer> verLaboralCareer();
    public void crearLaboralCareer(LaboralCareer per);
    public void borrarLaboralCareer(Long id);
    public LaboralCareer buscarLaboralCareer(Long id);
    
}
