// Orden de creacion 3.-

package com.portfolio.repository;

import com.portfolio.model.Organization;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    
    List<Organization> findByPersonId(Long Id);
    
}