import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDto, LoginUsuario } from '../models';
import { DataService } from './data.service';


// const AUTH_API = "http://localhost:10000/auth/"
const AUTH_API = environment.apiURL+ "/auth/";

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

  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {

    console.log("Intentando loguearse como: ", loginUsuario.nombreUsuario);
    return this.httpClient.post<JwtDto>(AUTH_API + 'login', loginUsuario)
  }

  public logout(): void {
    window.sessionStorage.clear();

    this.adminService.setCurrentAdmin(false);
  }


}

// https://rafaelneto.dev/blog/gestionar-estado-angular-rxjs-behaviorsubject-servicios-datos-observables/
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private currentAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject({} as boolean);
  public readonly currentAdmin: Observable<boolean> = this.currentAdminSubject.asObservable();

  constructor() { }

  setCurrentAdmin(currentAdmin: boolean): void {
    this.currentAdminSubject.next(currentAdmin);
    console.log("Verificando rol del usuario");
    
  }
}