// Orden de creacion 3.-

package com.portfolio.repository;

import com.portfolio.model.DisplayData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DisplayDataRepository extends JpaRepository<DisplayData, Long> {
    
}
