// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.RolePosition;
import java.util.List;

/**
 *
 * @author waldr
 */
public interface IRolePositionService {
    
    public List<RolePosition> verRolePosition();
    public void crearRolePosition(RolePosition position);
    public void borrarRolePosition(Long id);
    public RolePosition buscarRolePosition(Long id);
  
}
