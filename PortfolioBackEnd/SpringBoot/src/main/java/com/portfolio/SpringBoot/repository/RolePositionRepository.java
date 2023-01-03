// Orden de creacion 3.-

package com.portfolio.SpringBoot.repository;

import com.portfolio.SpringBoot.model.RolePosition;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RolePositionRepository extends JpaRepository<RolePosition, Long>{
    
    List<RolePosition> findByPersonId(Long Id);
    
}
