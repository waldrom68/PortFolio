// Orden de creacion 1.-

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
    @GeneratedValue (strategy = GenerationType.SEQUENCE)
    private long id;
    @Column(nullable=false, length=45)
    private String name;
    @Column(length=255)
    private String resume;
    @Column(nullable=false)
    private int grupo = 1;
    
    private int orderdeploy = 0;
    
    @Column(nullable=false)
    private boolean status = true;


    public Card(String name, String resume) {
        
        this.name = name;
        this.resume = resume;

    }
    
    public Card() {
        
    }


    
}
