// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.DTO.DTOPhone;
import com.portfolio.SpringBoot.model.Phone;
import java.util.List;

public interface IPhoneService {
    
    public boolean crearPhone(Phone phone);
    public void borrarPhone(Long id);
    public Phone buscarPhone(Long id);
    
    public List<Phone> verPhones();
    public List<DTOPhone> verByPersonId(Long id);
    
}
