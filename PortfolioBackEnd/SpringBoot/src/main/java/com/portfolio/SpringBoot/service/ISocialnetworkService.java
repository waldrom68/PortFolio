// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.SocialNetwork;
import java.util.List;

/**
 *
 * @author waldr
 */
public interface ISocialnetworkService {
    
    public List<SocialNetwork> verSocial();
    public void crearSocial(SocialNetwork social);
    public void borrarSocial(Long id);
    public SocialNetwork buscarSocial(Long id);
}
