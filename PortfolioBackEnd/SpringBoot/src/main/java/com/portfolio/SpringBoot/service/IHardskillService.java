// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.DTO.DTOHardskill;
import com.portfolio.SpringBoot.model.Hardskill;
import java.util.List;


public interface IHardskillService {
    
    public Hardskill crearHard(Hardskill soft);
    public void borrarHard(Long id);
    public Hardskill buscarHard(Long id);
    
    public List<Hardskill> verHard();
    public List<DTOHardskill> verByPersonId(Long id);
    
}
