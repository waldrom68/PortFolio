package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.PortfolioSetting;
import com.portfolio.SpringBoot.repository.PortfolioSetRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PorfolioSettService implements IPortfolioSetting {
    
    // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
    @Autowired
    public PortfolioSetRepository portRepo;

    @Override
    public List<PortfolioSetting> verPSett() {
        return portRepo.findAll();
    }

    @Override
    public void crearPSett(PortfolioSetting port) {
        portRepo.save(port);
    }

    @Override
    public void borrarPSett(Long id) {
        portRepo.deleteById(id);
    }

    @Override
    public PortfolioSetting buscarPSett(Long id) {
        return portRepo.findById(id).orElse(null);
    }
    
    
}
