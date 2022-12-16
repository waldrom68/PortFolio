
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
//    long ccNumber;
//
//    @OneToMany // unidirectional
//    @OrderColumn
//    List<CardTransaction> transactionHistory;
//
//    // ...
//}

@Getter @Setter
@Entity
public class Person {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private long id;
    
    @Column(nullable=false, length=45)
    private String name;
    private String lastName;
    private String pathFoto;
    private String location;
    private String profession;
    
    @Column(length = 1000)
    private String profile;
    @Column(length = 500)
    private String objetive;
    private Year since;
    private String email;
    private String username;
    private String password;

    
    public Person() {
    }

    
    public Person(long id, String name, String lastName, String pathFoto, String location, String profession, String profile, String objetive, Year since, String email, String username, String password) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.pathFoto = pathFoto;
        this.location = location;
        this.profession = profession;
        this.profile = profile;
        this.objetive = objetive;
        this.since = since;
        this.email = email;
        this.username = username;
        this.password = password;
    }
    
}
