// Orden de creacion 1.-

package com.portfolio.SpringBoot.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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
public class Person {
    @Id
    @GeneratedValue (strategy = GenerationType.SEQUENCE)
    private long id;
    
    @Column(nullable=false, length=45)
    private String name;
    @Column(nullable=false, length=45)
    private String lastName;
    private String pathFoto;
    @Column(nullable=false, length=100)
    private String location;
    @Column(length=100)
    private String profession;
    
    @Column(length = 1000)
    private String profile;
    @Column(length = 500)
    private String objetive;
    @Column(nullable=false)
    private Year since;
    @Column(nullable=false, length=45)
    private String email;
    @Column(nullable=false, length=45)
    private String username;
    @Column(nullable=false, length=45)
    private String password;
    
    // relaciones one to many
//    @OneToMany
//    private List<Phone> listaPhone;
//    @OneToMany
//    private List<SocialNetwork> listaSocialNetwork;
//    @OneToMany
//    private List<Interest> listaInterest;
    
    
    // relaciones one to one
    @OneToOne
    @JoinColumn(name="displaydata_id", referencedColumnName="id")
    private DisplayData displaydata_id;
    
      
    
    public Person() {
    }

    public Person(String name, String lastName, String pathFoto, String location, String profession, String profile, String objetive, Year since, String email, String username, String password) {
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

    @Override
    public String toString() {
        return "Person{" + "id=" + id + ", name=" + name + ", lastName=" + lastName + ", displaydata_id=" + displaydata_id + '}';
    }








}
