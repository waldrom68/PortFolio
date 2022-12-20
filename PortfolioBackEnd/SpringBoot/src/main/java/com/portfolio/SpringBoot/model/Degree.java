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
public class Degree {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private long id;
    
    @Column(nullable=false, length=45)
    private String name;
    
}
