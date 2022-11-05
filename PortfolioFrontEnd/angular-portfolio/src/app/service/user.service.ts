// Este servicio nos permite obtener los JSON con la informacion y permitirnos modificarla
// Con esta idea, dejaremos de usar mock-data.ts (creado para tener info a la hora del desarrollo)
import { Injectable } from '@angular/core';  // 
import { Observable, of } from 'rxjs';


// Esto es para leer los datos del script mock, pero este servicio es reeplazado por un
// servidor de base de datos, actualmente respaldada por un json
import { Users } from '../data'
import { USERS } from '../mock-data';

import { HttpClient, HttpHandler } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // se define la variable que apunta al http del servidor de API con el json
  private apiURL = 'http://localhost:5000/Users'
  constructor(
    // inicializamos el metodo http
    private http: HttpClient
  ) {}

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiURL)
    // parte del codigo que leia los datos de /mock-data
      // const users = of(USERS);
      // return users
    // codigo que usa el servidor api
  }
 
  

}
