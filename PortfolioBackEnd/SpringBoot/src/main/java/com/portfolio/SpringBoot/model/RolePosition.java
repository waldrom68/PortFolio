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
public class RolePosition {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private long id;
    
    @Column(nullable=false, length=65)
    private String description;
    
    private int order_ = 0;
    
    private Long LaboralCarrer_id;
    private Long RoleList_id;


    public RolePosition() {
    }

    public RolePosition(long id, String description, Long LaboralCarrer_id, Long RoleList_id) {
        this.id = id;
        this.description = description;
        this.LaboralCarrer_id = LaboralCarrer_id;
        this.RoleList_id = RoleList_id;
    }


    
    
    
}
