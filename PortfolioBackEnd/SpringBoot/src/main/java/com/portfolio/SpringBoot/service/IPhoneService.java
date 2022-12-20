// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Phone;
import java.util.List;

public interface IPhoneService {
    
    public List<Phone> verPhones();
    public void crearPhone(Phone phone);
    public void borrarPhone(Long id);
    public Phone buscarPhone(Long id); 
}
