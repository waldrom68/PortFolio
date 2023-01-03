// Orden de creacion 3

package com.portfolio.SpringBoot.repository;

import com.portfolio.SpringBoot.model.Degree;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DegreeRepository extends JpaRepository<Degree, Long> {
    
    List<Degree> findByPersonId(Long Id);
}
