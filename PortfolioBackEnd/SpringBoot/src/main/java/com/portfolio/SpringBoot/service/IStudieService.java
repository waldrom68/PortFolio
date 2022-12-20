// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Studie;
import java.util.List;


public interface IStudieService {
    
    public List<Studie> verStudie();
    public void crearStudie(Studie studie);
    public void borrarStudie(Long id);
    public Studie buscarStudie(Long id);
    
}
