
package com.portfolio.SpringBoot.repository;

import com.portfolio.SpringBoot.model.PortfolioSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PortfolioSetRepository extends JpaRepository<PortfolioSetting, Long> {
    
}
