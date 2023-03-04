import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto, LoginUsuario, Usuario } from '../models';
import { AdminService, DataService } from './data.service';

const AUTH_API = "http://localhost:10000/auth/"

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private httpClient: HttpClient, 
    private dataService: DataService,
            // PENDIENTE MODO PRUEBA
private adminService: AdminService,
// FIN MODO PRUEBA
    ) { }

  // public register(nuevoUsuario: Usuario): Observable<any>{
  //   return this.httpClient.post<any>(AUTH_API + 'new', nuevoUsuario);
  // }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto>{
    
    console.log("Intentando loguearse como: ", loginUsuario.nombreUsuario);
    return this.httpClient.post<JwtDto>(AUTH_API+ 'login', loginUsuario)
  }

  public logout(): void {
    window.sessionStorage.clear();
    //aqui debo cambiar el status de flagChangeUser, ubicado en data.service.ts
    this.dataService.hasCredentials(false)
    console.log("ELIMINANDO CREDENCIALES GUARDADAS")
    this.adminService.setCurrentAdmin( false );
  }
  
  
}

