// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.DTO.DTOLaboralCareer;
import com.portfolio.SpringBoot.model.LaboralCareer;
import com.portfolio.SpringBoot.model.Organization;
import com.portfolio.SpringBoot.model.Person;
import com.portfolio.SpringBoot.model.RolePosition;
import com.portfolio.SpringBoot.repository.LaboralCareerRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class LaboralCareerService implements ILaboralCareerService {

    // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    @Autowired public LaboralCareerRepository laboralRepo;
    @Autowired public IPersonService persServ;
    @Autowired public IRolePositionService roleServ;
    @Autowired public IOrganizationService orgaServ;
    

    @Override
    public boolean crearLaboralCareer(LaboralCareer laboral) {
        
        Person pers = persServ.buscarPersona(laboral.getPerson().getId());
        Organization orga = orgaServ.buscarOrganizacion(laboral.getOrganization().getId());
        RolePosition role = roleServ.buscarRolePosition(laboral.getRoleposition().getId());
        
        if (pers != null && orga != null && role != null) {
            laboral.setPerson(pers);
            laboral.setOrganization(orga);
            laboral.setRoleposition(role);
            laboralRepo.save(laboral);
            
        } else {
            return false;
        }
        
        return true;
    }

    @Override
    public void borrarLaboralCareer(Long id) {
        laboralRepo.deleteById(id);
    }

    @Override
    public LaboralCareer buscarLaboralCareer(Long id) {
        return laboralRepo.findById(id).orElse(null);
    }
    
    @Override
    public List<LaboralCareer> verLaboralCareer() {
        return laboralRepo.findAll(Sort.by("orderdeploy").ascending());
    }

    @Override
    public List<LaboralCareer> verByPersonId(Long id) {
        List<LaboralCareer> listcareer = laboralRepo.findByPersonId(id);
        List listatemp = new ArrayList();
        
        for (LaboralCareer elemento :listcareer ) {
            DTOLaboralCareer tempDTO = new DTOLaboralCareer();
            
            tempDTO.setId(elemento.getId());
//            tempDTO.setPosition(elemento.getPosition());
            tempDTO.setResume(elemento.getResume());
            tempDTO.setStartDate(elemento.getStartDate());
            tempDTO.setEndDate(elemento.getEndDate());
            tempDTO.setOrderdeploy(elemento.getOrderdeploy());
            tempDTO.setStatus(elemento.isStatus());
            tempDTO.setOrganization(elemento.getOrganization().getName());
            tempDTO.setOrga_resume(elemento.getOrganization().getResume());
            tempDTO.setRoleposition(elemento.getRoleposition().getName());
        
            listatemp.add(tempDTO);
        }
        
        return listatemp;
        
    }
    
    
}
