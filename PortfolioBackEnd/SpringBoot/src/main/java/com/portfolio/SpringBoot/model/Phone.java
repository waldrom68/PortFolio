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
public class Phone {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private long id;
    
    @Column(nullable=false, length=25)
    private String description;
    @Column(nullable=false, length=20)
    private String number;
    @Column(nullable=false)
    private int orderdeploy = 0;
    
    // El Many apunta a esta Entity y el One al modelo de la relacion
    // Si deja de existir este registro, debe mantener a quien lo contenía.
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="person")
    Person person;

    public Phone() {
    }

    public Phone(String description, String number, Person person) {
        this.description = description;
        this.number = number;
        this.person = person;
    }

    
    
    
}
