// Orden de creacion 3.-

package com.portfolio.repository;

import com.portfolio.model.LaboralCareer;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LaboralCareerRepository extends JpaRepository<LaboralCareer, Long> {
    
    List<LaboralCareer> findByPersonId(Long Id);
    
}
