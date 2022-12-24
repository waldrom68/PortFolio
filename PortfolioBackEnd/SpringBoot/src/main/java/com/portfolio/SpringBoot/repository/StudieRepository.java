// Orden de creacion 3.-

package com.portfolio.SpringBoot.repository;

import com.portfolio.SpringBoot.model.Studie;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudieRepository extends JpaRepository <Studie, Long> {
    
       List<Studie> findByPersonId(Long Id);
    
}
