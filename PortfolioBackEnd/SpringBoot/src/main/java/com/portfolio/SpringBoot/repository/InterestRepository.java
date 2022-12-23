// Orden de creacion 3.-

package com.portfolio.SpringBoot.repository;

import com.portfolio.SpringBoot.model.Interest;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterestRepository extends JpaRepository<Interest, Long> {
    
    List<Interest> findByPersonId(Long Id);
    
}
