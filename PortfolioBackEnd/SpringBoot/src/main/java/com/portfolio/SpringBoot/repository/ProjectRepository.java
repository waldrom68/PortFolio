// Orden de creacion 3.-

package com.portfolio.SpringBoot.repository;

import com.portfolio.SpringBoot.model.Project;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProjectRepository extends JpaRepository<Project, Long>{
    
        List<Project> findByPersonId(Long Id);
        
}
