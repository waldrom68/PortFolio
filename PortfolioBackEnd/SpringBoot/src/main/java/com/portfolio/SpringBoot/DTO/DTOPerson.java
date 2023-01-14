// Orden de creacion 0, Que es lo que voy a mostrar?

package com.portfolio.SpringBoot.DTO;

import com.portfolio.SpringBoot.model.DisplayData;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DTOPerson implements Serializable {
    private long id;
    private String name;
    private String lastName;
    private String pathFoto;
    private String location;
    private String profession;
    private String profile;
    private String objetive;
    private String since;
    private String email;
    private String username;
    private DisplayData displaydata;
}
