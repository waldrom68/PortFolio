// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Person;
import java.util.List;


public interface IPersonService {
    
    public List<Person> verPersonas();
    public void crearPersona(Person per);
    public void borrarPersona(Long id);
    public Person buscarPersona(Long id);
    
}
