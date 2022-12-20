// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Interest;
import java.util.List;


public interface IInterestService {
    
   public List<Interest> verIntereses();
   public void crearInteres(Interest inter);
   public void borrarInteres(Long id);
   public Interest buscarInteres(Long id);
    
}
