// Orden de creacion 4.-

package com.portfolio.SpringBoot.service;

import com.portfolio.SpringBoot.model.Card;
import com.portfolio.SpringBoot.repository.CardRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CardService implements ICardService {

    // Para la conecion con el JPA : PersonRepository hara de intermediario entre
    // la DB y nuestros metodos, para ello deberemos inyectar nuestra dependencia
        
    @Autowired
    public CardRepository cardRepo;

    @Override
    public List<Card> verCards() {
        return cardRepo.findAll(Sort.by("grupo", "orderdeploy").ascending());
    }

    @Override
    public void borrarCard(Long id) {
        cardRepo.deleteById(id);
    }

    @Override
    public Card buscarCard(Long id) {
        return cardRepo.findById(id).orElse(null);
        
    }
    
    @Override
    public String editarCard(Card card) {
        cardRepo.save(card);
        return "Guardado en el repositorio";
        
    }

    @Override
    public Long contarCard() {
        return cardRepo.count();
    }

    
    
    
}
