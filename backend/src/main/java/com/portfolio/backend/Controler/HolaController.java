
package com.portfolio.backend.Controler;

import com.portfolio.backend.Cliente;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HolaController {
    
//    Metodos para los GET
//
    @GetMapping ("/hola")  
    public String decirHola() {
        return "<h1>Hello Word</h1>";
    }
    
    @GetMapping ("/hola/{nombre}")  // estariamos recibiendo el parametro nombre desde la url tras un /
    // http://localhost:8080/hola/Walter
    public String decirHolaPersonal(@PathVariable String nombre) {
        return "<h1>Hello Word</h1><h2>" + nombre + "</h2>";
    }
    // otra forma de pasar parametros en un endpoint
    @GetMapping ("/holaConParametros")  
    // estariamos recibiendo el parametro nombre desde la url con ?nombre=....&edad=....&profesion=...
    public String decirHolaEspecial(@RequestParam String nombre,
                            @RequestParam String edad,
                            @RequestParam String profesion) {
        
        return "<h2>" + nombre.toUpperCase() + " de " + edad + 
                " años y con profesion de <em>" + profesion + 
                "</em>, ha ingresado al sitio.....</h2><h1>¡Alabado sea el Señor!</h1>";
    }
    
    @GetMapping ("/listarClientes")
    public List<Cliente> traerCliente() {
    //  Devuelve al navegador un JSON con el listado de clientes      
        List<Cliente> listaClientes = new ArrayList<Cliente>();
        listaClientes.add(new Cliente(1L, "Walter", "Romario"));
        listaClientes.add(new Cliente(2L, "Josefina", "Duarte"));
        listaClientes.add(new Cliente(3L, "Sapo", "Pepe"));
        
        return listaClientes;
    }
  
    
    //    Respuesta personalizada (body, head, status, frente a un GET
    @GetMapping ("/pruebaresponse")
    public ResponseEntity<String> traerRespuesta() {
        // HttpStatus.CREATED
        return new ResponseEntity<>("Esto es un mensaje Response Entity", HttpStatus.OK );
    }
    
    
    
//  Metodos para los POST
//
    // sin recibir parametros en la url
    @PostMapping("/delCliente")  
    public void borrarCliente() {
//        codigo del metodo para crear un nuevo cliente
    }
    
    // recibiendo parametros en el body
    @PostMapping("/newCliente")  
    public void nuevoCliente(@RequestBody Cliente cli) {
        System.out.println("Nombre: " + cli.getNombre() + 
                " \nApellido: " + cli.getApellido());
    }
    
    
}

