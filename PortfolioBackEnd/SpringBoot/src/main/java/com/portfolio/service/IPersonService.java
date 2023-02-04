// Orden de creacion 2.-

package com.portfolio.service;

import com.portfolio.DTO.DTOPerson;
import com.portfolio.model.Person;



public interface IPersonService {
    
    public void borrarPersona(Long id);
    public Person buscarPersona(Long id);
    public Person crearPersona(Person per);
//    public void editPersona(Person per);
    public DTOPerson verPersona(Long id);
    
}
