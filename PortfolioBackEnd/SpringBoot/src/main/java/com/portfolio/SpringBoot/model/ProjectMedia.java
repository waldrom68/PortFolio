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
public class ProjectMedia {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private long id;
    
    @Column(nullable=false, length=250)
    private String filePath;
    @Column(nullable=false)
    private Date upLoadDate;
    
    private int order_ = 0;

    // El Many apunta a esta Entity y el One al modelo de la relacion
    // Si deja de existir este registro, debe mantener a quien lo contenía.
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="project")
    Project project;
    
    
    public ProjectMedia() {
    }

    public ProjectMedia(String filePath, Date upLoadDate, Project project) {
        this.filePath = filePath;
        this.upLoadDate = upLoadDate;
        this.project = project;
    }


    
    
    
}
