
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
public class Card {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private long id;
    @Column(nullable=false, length=45)
    private String name;
    @Column(length=255)
    private String resume;
    @Column(nullable=false)
    private int group_ = 1;
    private int order_ = 0;
    @Column(nullable=false)
    private boolean status = true;
    private long PortfolioSetting_id;

    public Card(long id, String name, String resume, long PortfolioSetting_id) {
        this.id = id;
        this.name = name;
        this.resume = resume;
        this.PortfolioSetting_id = PortfolioSetting_id;
    }
    
    public Card() {
    }

    
}
