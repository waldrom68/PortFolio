import { Injectable } from '@angular/core';
import { DataService } from './data.service';

const TOKEN_KEY = "AuthToken";
const USERNAME_KEY = "AuthUsername";
const AUTHORITIES_KEY = "AuthAutthorities";


@Injectable({
  providedIn: 'root'
})


export class TokenService {
  roles: Array<string> = [];


constructor() { }


public setToken(token:string): void {
  console.log("GENERANDO TOKEN")
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.setItem(TOKEN_KEY, token);
}

public getToken(): string {
  // El ! es porque esta variable puede no estar inicializada
  // this.isValidAdmin();
  return window.sessionStorage.getItem(TOKEN_KEY)!;
}

public setUserName(userName:string): void {
  window.sessionStorage.removeItem(USERNAME_KEY);
  window.sessionStorage.setItem(USERNAME_KEY, userName);
}

public getUserName(): string {
  // El ! es porque esta variable puede no estar inicializada
  return window.sessionStorage.getItem(USERNAME_KEY)!;
}

public setAuthorities(authorities:string[]): void {
  window.sessionStorage.removeItem(AUTHORITIES_KEY);
  window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
}

public getAuthorities(): string[] {
  // El ! es porque esta variable puede no estar inicializada
  this.roles = [];
  
  if (sessionStorage.getItem(AUTHORITIES_KEY)) {
    JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach( (authority:any) => {
      this.roles.push(authority.authority);
    });
  }
  return this.roles;
}

public isAdmin() {
  let temp = this.getAuthorities();
  // console.log("Es admin? : ", temp)
  // console.log("Es admin? : ", temp.includes("ROLE_ADMIN"))
  return this.getAuthorities().includes("ROLE_ADMIN")
}

public expiredToken(token: string): boolean {
  // Si no existe un token, lo interpreta como Token expirado.
  if (token) {
    const jwtToken = JSON.parse(atob(token.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeOut = (expires.getTime() - Date.now())/1000/60;
    if (timeOut >= 0) {
      console.log("El token expira en", timeOut.toFixed(1) , " minutos");
      return false;
  
    } else {
      
      console.log("Token vencido hace ", -timeOut.toFixed(1) , " minutos");
      return true;
    }
  }
  console.log("Sin token aun");
  return true;
}

public isValidAdmin() {
  // console.log("Administrator mode enabled ? ", this.isAdmin() && !this.expiredToken(this.getToken()))
  
  return this.isAdmin() && !this.expiredToken(this.getToken())
}


}
