// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.DTO.DTOStudie;
import com.portfolio.SpringBoot.model.Studie;
import java.util.List;


public interface IStudieService {
    
    public boolean crearStudie(Studie studie);
    public void borrarStudie(Long id);
    public Studie buscarStudie(Long id);
    
    public List<Studie> verStudie();
    public List<Studie> verByPersonId(Long id);
    
}
