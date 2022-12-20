// Orden de creacion 3.-

package com.portfolio.SpringBoot.repository;

import com.portfolio.SpringBoot.model.Softskill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoftskillRepository extends JpaRepository<Softskill, Long> {
    
}
