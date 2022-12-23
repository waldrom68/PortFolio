// Orden de creacion 5.-

package com.portfolio.SpringBoot.controller;
import com.portfolio.SpringBoot.model.Card;
import com.portfolio.SpringBoot.service.ICardService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// Recibe las peticiones y delega el negocio (es el pivot de la aplicacion)


@RestController
public class ControllerCard {
    
    
    //    Creamos la dependencia
    @Autowired 
    private ICardService cardServ;
    
    
    @GetMapping ("/list/card/all")
    public List<Card> verCards() {
        return cardServ.verCards();
    
    }

    @PostMapping ("/edit/card")
    public String crearCard (@RequestBody Card card) {
        // Si se tiene mas de 8 elementos solo se permite la edicion
        // El layout solo permite administrar 8 elementos.
        // Esta restriccion la coloco en el backend.
        if ( cardServ.buscarCard(card.getId()) != null || cardServ.verCards().size() < 8 ) {
            
                cardServ.editarCard(card);
                return "Se ha realizado un alta o una modificacion";
                
            } else {
                return " Se ha llegado al maximo de etiquetas que puede manejar el Portfolio, sólo se permite modificar los nombres y/o status de las existentes"; 

            }   

        }
    
}
