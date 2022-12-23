// Orden de creacion 1.-

package com.portfolio.SpringBoot.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Organization {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private long id;
    
    @Column(nullable=false, length=150)
    private String name;
    
    @Column(length=100)
    private String resume;
    
    private String url;

    public Organization() {
    }

    public Organization(String name, String resume, String url) {
        this.id = id;
        this.name = name;
        this.resume = resume;
        this.url = url;
    }
    
    
}
