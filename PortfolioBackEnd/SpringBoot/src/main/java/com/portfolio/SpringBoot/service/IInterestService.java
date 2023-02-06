// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.DTO.DTOInterest;
import com.portfolio.SpringBoot.model.Interest;
import java.util.List;


public interface IInterestService {
    
   public Interest crearInteres(Interest inter);
   public void borrarInteres(Long id);
   public Interest buscarInteres(Long id);
   
   public List<Interest> verIntereses();
   public List<DTOInterest> verByPersonId(Long id);
    
}
