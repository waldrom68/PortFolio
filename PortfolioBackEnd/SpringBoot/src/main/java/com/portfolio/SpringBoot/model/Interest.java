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
public class Interest {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(nullable=false, length=45)
    private String name;
    private int order_ = 0;
    private Long Person_id;

    public Interest() {
    }

    public Interest(Long id, String name, Long Person_id) {
        this.id = id;
        this.name = name;
        this.Person_id = Person_id;
    }
    
    
    
    
}
