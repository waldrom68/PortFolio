// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.DTO.DTOStudie;
import com.portfolio.SpringBoot.model.Degree;
import com.portfolio.SpringBoot.model.Organization;
import com.portfolio.SpringBoot.model.Person;
import com.portfolio.SpringBoot.model.Studie;
import com.portfolio.SpringBoot.repository.StudieRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class StudieService implements IStudieService {

    // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    @Autowired public StudieRepository studieRepo;
    @Autowired public IPersonService persServ;
    @Autowired public IDegreeService degreeServ;
    @Autowired public IOrganizationService orgaServ;
    

    @Override
    public boolean crearStudie(Studie studie) {

        Person pers = persServ.buscarPersona(studie.getPerson().getId());
        Organization orga = orgaServ.buscarOrganizacion(studie.getOrganization().getId());
        Degree degree = degreeServ.buscarDegree(studie.getDegree().getId());
        
        if (pers != null && orga != null && degree != null) {
            studie.setPerson(pers);
            studie.setOrganization(orga);
            studie.setDegree(degree);
            studieRepo.save(studie);
            
        } else {
            
            return false;
        }
        
        return true;
    }

    @Override
    public void borrarStudie(Long id) {
        studieRepo.deleteById(id);
    }

    @Override
    public Studie buscarStudie(Long id) {
        return studieRepo.findById(id).orElse(null);
    }
    
    @Override
    public List<Studie> verStudie() {
        return studieRepo.findAll(Sort.by("orderdeploy").ascending());
    }

    @Override
    public List<Studie> verByPersonId(Long id) {
        List<Studie> liststudie = studieRepo.findByPersonId(id);
        List listatemp = new ArrayList();
        
        for (Studie elemento :liststudie) {
            DTOStudie tempDTO = new DTOStudie();
            
            tempDTO.setId(elemento.getId());
            tempDTO.setName(elemento.getName());
            tempDTO.setStartDate(elemento.getStartDate());
            tempDTO.setEndDate(elemento.getEndDate());
            tempDTO.setOrderdeploy(elemento.getOrderdeploy());
            tempDTO.setOrganization(elemento.getOrganization().getName());
            tempDTO.setOrga_resume(elemento.getOrganization().getResume());
            tempDTO.setDegree(elemento.getDegree().getName());
        
            listatemp.add(tempDTO);
        
        
        }

        return listatemp;
        
        
//        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
//
//    private Long id;
//    private String name;
//    private Date startDate;
//    private Date endDate;
//    private int orderdeploy ;
//    
//    private String organization;
//    private String orga_resume;
//    private String degree;
//    private String degree_resume;