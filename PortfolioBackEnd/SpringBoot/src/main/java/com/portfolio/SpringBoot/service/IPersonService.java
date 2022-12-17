/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Person;
import java.util.List;

/**
 *
 * @author waldr
 */
public interface IPersonService {
    
    public List<Person> verPersonas();
    public void crearPersona(Person per);
    public void borrarPersona(Long id);
    public Person buscarPersona(Long id);
    
}
