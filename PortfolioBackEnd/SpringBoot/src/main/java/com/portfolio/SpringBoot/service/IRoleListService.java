// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.RoleList;
import java.util.List;


public interface IRoleListService {
        
    public List<RoleList> verRolelist();
    public void crearRolelist(RoleList role);
    public void borrarRolelist(Long id);
    public RoleList buscarRolelist(Long id);
    
}
