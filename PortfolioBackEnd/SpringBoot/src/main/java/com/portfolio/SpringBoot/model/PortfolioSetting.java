
package com.portfolio.SpringBoot.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
public class PortfolioSetting {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private long id;
    @Column(nullable=false, length=25)
    private String theme = "dark";
    @Column(nullable=false)
    private boolean status = true;


    public PortfolioSetting(long id, String theme, boolean status) {
        this.id = id;
        this.theme = theme;
        this.status = status;

    }

    public PortfolioSetting() {
    }
    
    
}

