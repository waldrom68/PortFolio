// Orden de creacion 3.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Phone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhoneRepository extends JpaRepository <Phone, Long>{
    
}
