// Orden de creacion 1.-

package com.portfolio.SpringBoot.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.Year;

import lombok.Getter;
import lombok.Setter;


// for reference off general usage view https://jakarta.ee/specifications/persistence/3.0/jakarta-persistence-spec-3.0.html
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
public class DisplayData {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private long id;
    
    private boolean name = true;
    private boolean lastName = true;
    private boolean photo = true;
    private boolean location = true;
    private boolean profession = true;
    private boolean since = true;
    
    private Long Person_id;
}
