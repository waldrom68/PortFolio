// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Person;
import java.util.List;


public interface IPersonService {
    
    public List<Person> verPersonas();
    public void borrarPersona(Long id);
    public Person buscarPersona(Long id);
    public Person crearPersona(Person per);
//    public void editPersona(Person per);
    
}
