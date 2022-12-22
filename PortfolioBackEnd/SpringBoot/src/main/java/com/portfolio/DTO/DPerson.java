package com.portfolio.DTO;

import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DPerson implements Serializable {

    private Long id;
    private String name;
    private String lastName;
    
    
}
