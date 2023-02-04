// Orden de creacion 2.-

package com.portfolio.service;

import com.portfolio.model.Studie;
import java.util.List;


public interface IStudieService {
    
    public Studie crearStudie(Studie studie);
    public void borrarStudie(Long id);
    public Studie buscarStudie(Long id);
    
    public List<Studie> verStudie();
    public List<Studie> verByPersonId(Long id);
    
}
