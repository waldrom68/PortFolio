// Orden de creacion 3.-

package com.portfolio.repository;

import com.portfolio.model.Interest;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterestRepository extends JpaRepository<Interest, Long> {
    
    List<Interest> findByPersonId(Long Id);
    
}
