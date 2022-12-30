// Orden de creacion 1.-

package com.portfolio.SpringBoot.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import java.util.Date;


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
    private Date since;
    @Column(nullable=false, length=45, unique = true)
    private String email;
    @Column(nullable=false, length=45, unique = true)
    private String username;
    @Column(nullable=false, length=45)
    private String password;
    
//    Relaciones UniDireccionales entre entidades
//    @<tipo relacion>To<tipo relacion>
//
//    El primer elemento del nombre de la anotacion apunta a la entidad de la clase 
//    que se está definiendo esta Entity y el One al modelo de la relacion.
//  
//    @OneToOne
//    @JoinColumn(name="displaydata_id", referencedColumnName="id")
//    private DisplayData displaydata_id;
//    
//    @ManyToOne  // El Many apunta a esta Entity y el One al modelo de la relacion
//    @JoinColumn(name="Person_id")
//    Person Person_id;
//    
//    @OneToMany("mappedBy="interest_id")  
//    private List<Interest> listaInterest;
//    Recomiendan no usarla, si bien está todo mapeado y es mas facil para programar,
//    baja la performance de la aplicacion.
//    
//    La idea general sería, invertirla definiendo @ManyToOne en la otra entidad.
//
//    <tipo relacion>To<tipo relacion>(cascade = CascadeType.REMOVE).
//      Elimina todas las relaciones que ya no tienen sentido conservar.
//    <tipo relacion>To<tipo relacion>(cascade = CascadeType.PERSIST).
//      Solo elimina la instancia, mantiene a quien lo contenia o con quien se 
//      relacionaba.
    
    
    
    // Relaciones one to one UniDireccional
    // Si deja de existir este registro, debe dejar de existir su relacion
    @OneToOne(cascade = CascadeType.REMOVE) 
    @JoinColumn(name="displaydata", referencedColumnName="id")
    private DisplayData displaydata;
    
      
    
    public Person() {
    }
    
    public Person(Long id) {
        this.id = id;
    }

    public Person(String name, String lastName, String pathFoto, String location, String profession, String profile, String objetive, Date since, String email, String username, String password) {
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
