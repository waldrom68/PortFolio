// Orden de creacion 3.-

package com.portfolio.repository;

import com.portfolio.model.Hardskill;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HardskillRepository extends JpaRepository<Hardskill, Long>{
        List<Hardskill> findByPersonId(Long Id);
}
