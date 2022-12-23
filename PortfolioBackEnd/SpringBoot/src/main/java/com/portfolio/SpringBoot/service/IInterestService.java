// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.DTO.DTOInterest;
import com.portfolio.SpringBoot.model.Interest;
import java.util.List;


public interface IInterestService {
    
   public boolean crearInteres(Interest inter);
   public void borrarInteres(Long id);
   public Interest buscarInteres(Long id);
   
   public List<Interest> verIntereses();
   public List<DTOInterest> verByPersonId(Long id);
    
}
