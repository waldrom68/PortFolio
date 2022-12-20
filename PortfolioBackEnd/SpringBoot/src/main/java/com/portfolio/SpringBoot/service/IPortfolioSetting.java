package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.PortfolioSetting;
import java.util.List;


public interface IPortfolioSetting {
    
    public List<PortfolioSetting> verPSett();
    public void crearPSett(PortfolioSetting port);
    public void borrarPSett(Long id);
    public PortfolioSetting buscarPSett(Long id);
    
}
