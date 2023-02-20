// PENDIENTE ELIMINAR ESTE COMPONENTE, PUES ES DE PRUEBA NO PERTENECERÁ 
// AL PROYECTO FINAL DEL PORTFOLIO, PUES LA IDEA NO ERA AMBL DE USUARIOS

// Este servicio nos permite obtener los JSON con la informacion y modificarla
// Con esta idea, dejaremos de usar mock-data.ts (creado para tener info a la hora del desarrollo)
import { Injectable } from '@angular/core';  // 
import { Observable, of } from 'rxjs';


import { User } from '../models'
// Esto era para leer los datos del script mock, pero este servicio es reemplazado por un
// servidor de base de datos, actualmente respaldada por un json
// import { USERS } from '../mock-data';

import { HttpClient, HttpHeaders } from '@angular/common/http'  // Para ejecutar los metodos GET, PUT, POST, ETC

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // se define la variable que apunta al http del servidor de API con el json
  private apiURL = 'http://localhost:5000'

  // PENDIENTE, reubicar esta declaracion, debe estar vinculada con el logging
  private USERID:number = 1; 
  private EndPoint:string = ""

  constructor(
    // inicializamos el metodo http
    private http: HttpClient
  ) {}



  getUsers(): Observable<User[]> {
    // codigo que usa el servidor api para traer los datos de la DB
    return this.http.get<User[]>(`${this.apiURL}/User`)
  }

  delUsers(user:User): Observable<User>{
    // Este codigo elimina de la DB al usuario
    const url = `${this.apiURL}/User${user.id}`
    return this.http.delete<User>(url)
  }
 
  addUsers(user:User): Observable<User>{
    // Este codigo agrega un usuario a la DB 
    return this.http.post<User>(`${this.apiURL}/User`, user, httpOptions)
  }  

  updateUsers(user:User): Observable<User>{
    // Este codigo modifica el valor del usuario en la DB
    const url = `${this.apiURL}/User/${user.id}`;
        return this.http.put<User>(url, user)
  }

  toggleAdminUsers(user:User): Observable<User>{
    // Este codigo alterna entre admin/no admin en la DB
    const url = `${this.apiURL}/User/${user.id}`
    return this.http.put<User>(url, user, httpOptions)
  }
}
