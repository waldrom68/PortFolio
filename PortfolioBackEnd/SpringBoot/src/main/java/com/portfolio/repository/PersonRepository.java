// Orden de creacion 3.-

package com.portfolio.repository;

import com.portfolio.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

}
