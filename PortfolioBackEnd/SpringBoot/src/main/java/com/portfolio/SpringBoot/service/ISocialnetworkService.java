// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.DTO.DTOSocialNetwork;
import com.portfolio.SpringBoot.model.SocialNetwork;
import java.util.List;

/**
 *
 * @author waldr
 */
public interface ISocialnetworkService {
    
    public SocialNetwork crearSocial(SocialNetwork social);
    public void borrarSocial(Long id);
    public SocialNetwork buscarSocial(Long id);
    
    public List<SocialNetwork> verSocial();
    public List<DTOSocialNetwork> verByPersonId(Long id);
    
}
