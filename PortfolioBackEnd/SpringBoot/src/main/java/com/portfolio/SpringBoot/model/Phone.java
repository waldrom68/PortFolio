// Orden de creacion 1.-

package com.portfolio.SpringBoot.model;

// for reference off general usage view https://jakarta.ee/specifications/persistence/3.0/jakarta-persistence-spec-3.0.html

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

// p.ej.: @Column(updatable = false), @ManyToOne, @JoinTable
//     @MapKeyJoinColumn(name="MOVIE", referencedColumnName="ID")
//     Map<Movie, Integer> videoInventory;
//
//@Entity
//public class CreditCard {
//    @Id
//    long Number;
//
//    @OneToMany // unidirectional
//    @OrderColumn
//    List<CardTransaction> transactionHistory;
//
//    // ...
//}

@Getter @Setter
@Entity
public class Phone {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private long id;
    
    @Column(nullable=false, length=25)
    private String description;
    @Column(nullable=false, length=15)
    private String number;
    
    private int order_ = 0;
    
    private long Person_id;

    public Phone() {
    }

    public Phone(long id, String description, String number, long Person_id) {
        this.id = id;
        this.description = description;
        this.number = number;
        this.Person_id = Person_id;
    }
    
    
    
}
