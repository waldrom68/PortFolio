// Orden de creacion 2.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Hardskill;
import java.util.List;


public interface IHardskillService {
    public List<Hardskill> verHard();
    public void crearHard(Hardskill soft);
    public void borrarHard(Long id);
    public Hardskill buscarHard(Long id);
}
