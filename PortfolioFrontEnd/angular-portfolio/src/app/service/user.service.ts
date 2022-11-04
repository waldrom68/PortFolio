// Este servicio nos permite obtener los JSON con la informacion y permitirnos modificarla
// Con esta idea, dejaremos de usar mock-data.ts (creado para tener info a la hora del desarrollo)
import { Injectable } from '@angular/core';  // 
import { Observable, of } from 'rxjs';



import { Users } from '../data'
import { USERS } from '../mock-data';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUsers(): Observable<Users[]> {
    const users = of(USERS);
    return users
  }



}
