// Orden de creacion 1.-

package com.portfolio.SpringBoot.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

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

@ToString
@Getter @Setter
@Entity
public class RolePosition {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private long id;
    
    @Column(nullable=false, length=100)
    private String name;
    
    // El Many apunta a esta Entity y el One al modelo de la relacion
    // Si deja de existir este registro, debe mantener a quien lo contenía.
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="person")
    Person person;
    

    public RolePosition() {
    }

    public RolePosition(long id) {
        this.id = id;
    }

    public RolePosition(String name) {
         this.name = name;


    }


    
    
    
}
