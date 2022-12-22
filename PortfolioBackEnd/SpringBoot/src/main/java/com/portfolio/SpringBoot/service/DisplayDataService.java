// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.DisplayData;
import com.portfolio.SpringBoot.repository.DisplayDataRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DisplayDataService implements IDisplayDataService {
    // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    @Autowired
    public DisplayDataRepository displayRepo;

    @Override
    public List<DisplayData> verDisplay() {
        return displayRepo.findAll();
    }

    @Override
    public void crearDisplay(DisplayData display) {
        displayRepo.save(display);
    }

    @Override
    public void borrarDisplay(Long id) {
        displayRepo.deleteById(id);
    }

    @Override
    public DisplayData buscarDisplay(Long id) {
        return displayRepo.findById(id).orElse(null);
    }
    
    @Override
    public DisplayData crearForceDisplay(DisplayData display) {
        return displayRepo.saveAndFlush(display);
    }
    }
