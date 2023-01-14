// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;


import com.portfolio.SpringBoot.DTO.DTOSoftskill;
import com.portfolio.SpringBoot.model.Softskill;
import java.util.List;

public interface ISoftskillService {
    
    public Softskill crearSoft(Softskill soft);
    public void borrarSoft(Long id);
    public Softskill buscarSoft(Long id);
    
    public List<Softskill> verSoft();
    public List<DTOSoftskill> verByPersonId(Long id);

}

// para una prueba
//    public List<Softskill> verByAssesment(int puntaje);