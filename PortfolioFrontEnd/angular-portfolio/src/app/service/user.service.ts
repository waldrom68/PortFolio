// Este servicio nos permite obtener los JSON con la informacion y permitirnos modificarla
// Con esta idea, dejaremos de usar mock-data.ts (creado para tener info a la hora del desarrollo)
import { Injectable } from '@angular/core';  // 
import { Observable, of } from 'rxjs';


// Esto es para leer los datos del script mock, pero este servicio es reeplazado por un
// servidor de base de datos, actualmente respaldada por un json
import { User } from '../data'
import { USERS } from '../mock-data';

import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // se define la variable que apunta al http del servidor de API con el json
  private apiURL = 'http://localhost:5000/User'
  constructor(
    // inicializamos el metodo http
    private http: HttpClient
  ) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL)
    // parte del codigo que leia los datos de /mock-data
      // const users = of(USERS);
      // return users
    // codigo que usa el servidor api
  }
  delUsers(user:User): Observable<User[]>{
    // Este codigo elimina de la DB el usuario
    const url = `${this.apiURL}/${user.id}`

    console.log("url del servicio de borrado", url)
    console.log("Lo borro de db.Json, accediendo a la APIRest")
    return this.http.delete<User[]>(url)
  }
 
  updateUsers(user:User): Observable<User[]>{
    // Este codigo modifica el valor del usuario en la DB
    console.log("El elemento a modificar es:", user)

    const url = `${this.apiURL}/${user.id}`;
    const newData: User = 
    {
      "id": user.id,
      "username": "ElBagallo",
      "password": "TieneSuerte",
      "admin": false
    
    }

      console.log("url del servicio de actualizacion de datos", url);
      return this.http.put<User[]>(url, newData)
  }

  toggleAdminUsers(user:User): Observable<User>{
    // Este codigo elimina de la DB el usuario
    const url = `${this.apiURL}/${user.id}`

    console.log("url del servicio", url)
    console.log("Lo actualizo en la db.Json, accediendo a la APIRest")
    return this.http.put<User>(url, user, httpOption)
  }
}
