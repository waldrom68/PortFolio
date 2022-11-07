// Este servicio nos permite obtener los JSON con la informacion y permitirnos modificarla
// Con esta idea, dejaremos de usar mock-data.ts (creado para tener info a la hora del desarrollo)
import { Injectable } from '@angular/core';  // 
import { Observable, of } from 'rxjs';


// Esto es para leer los datos del script mock, pero este servicio es reeplazado por un
// servidor de base de datos, actualmente respaldada por un json
import { User } from '../data'
import { USERS } from '../mock-data';

import { HttpClient, HttpHandler } from '@angular/common/http'

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
    const url = `${this.apiURL}/${user.id}`
    console.log("url del servicio de borrado", url)
    console.log("Lo borro de db.Json, accediendo a la APIRest")
    return this.http.delete<User[]>(url)
  }
 
  // updateUsers(user:User): Observable<User[]>{
  //   const url = `${this.apiURL}/${user.id}`
  //   user = {
  //       "id": 1,
  //       "username": "RUPERTO",
  //       "password": "tomate"
  //     }

  //     console.log("url del servicio de actualizacion de datos", url)
      // return this.http.put(url, user)
  // }

}
