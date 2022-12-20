// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Hardskill;
import com.portfolio.SpringBoot.repository.HardskillRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HardskillService implements IHardskillService {

    @Autowired
    public HardskillRepository hardRepo;
    
    @Override
    public List<Hardskill> verHard() {
        return hardRepo.findAll();
    }

    @Override
    public void crearHard(Hardskill soft) {
        hardRepo.save(soft);
    }

    @Override
    public void borrarHard(Long id) {
        hardRepo.deleteById(id);
    }

    @Override
    public Hardskill buscarHard(Long id) {
        return hardRepo.findById(id).orElse(null);
    }
    
}
