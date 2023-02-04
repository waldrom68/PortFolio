// Orden de creacion 2.-

package com.portfolio.service;

import com.portfolio.model.Card;
import java.util.List;


public interface ICardService {

    public List<Card> verCards();
    public String editarCard(Card card);
    public void borrarCard(Long id);
    
    public Card buscarCard (Long id);
    public Long contarCard();
    
}

