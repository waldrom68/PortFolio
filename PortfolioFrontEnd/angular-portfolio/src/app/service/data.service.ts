import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Users, HardSkill, SoftSkill, Studies, LaboralCareer, Interests, Projects } from '../data'


import { HttpClient, HttpHeaders } from '@angular/common/http'  // Para ejecutar los metodos GET, PUT, POST, ETC


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiURL = 'http://localhost:5000'
  private EndPoint:string = ""

  // PENDIENTE, vincular con el logging
  private USERID:number = 1; 

  constructor(  
        // inicializamos el metodo http
        private http: HttpClient
  ) { }


  // codigo que usa el servidor api para traer los datos de la DB
  alertDelete(modalData: any) {
    alert("Product with ID " + modalData.productId + " has been deleted.");
  }

  getGralData(): Observable<Users> {
    return this.http.get<Users>(`${this.apiURL}/Users/${this.USERID}`)
  }
  // HardSkills
  getHardSkill(): Observable<HardSkill[]> {
    this.EndPoint = `${this.apiURL}/HardSkills?userId=${this.USERID}`
    return this.http.get<HardSkill[]>(this.EndPoint )
  }
  delHardSkills(softskill:HardSkill): Observable<HardSkill>{
    // Este codigo elimina de la DB al usuario
    const url = `${this.apiURL}/HardSkills/${softskill.id}`
    return this.http.delete<HardSkill>(url)
  }
  // Interests
  getInterests(): Observable<Interests[]> {
    this.EndPoint = `${this.apiURL}/Interests?userId=${this.USERID}`
    return this.http.get<Interests[]>(this.EndPoint )
  }
  delInterests(interest:Interests): Observable<Interests>{
    // Este codigo elimina de la DB al usuario
    const url = `${this.apiURL}/Interests/${interest.id}`
    return this.http.delete<Interests>(url)
  }
  // SoftSkills
  getSoftSkill(): Observable<SoftSkill[]> {
  this.EndPoint = `${this.apiURL}/SoftSkills?userId=${this.USERID}`
  return this.http.get<SoftSkill[]>(this.EndPoint )
  }
  delSoftSkills(softskill:SoftSkill): Observable<SoftSkill>{
  // Este codigo elimina de la DB al usuario
  const url = `${this.apiURL}/SoftSkills/${softskill.id}`
  return this.http.delete<SoftSkill>(url)
  }
  // Projects
  getProjects(): Observable<Projects[]> {
    this.EndPoint = `${this.apiURL}/Projects?userId=${this.USERID}`
    return this.http.get<Projects[]>(this.EndPoint )
  }
  delProjects(projects:Projects): Observable<Projects>{
    // Este codigo elimina de la DB al usuario
    const url = `${this.apiURL}/Projects/${projects.id}`
    return this.http.delete<Projects>(url)
  }

  
  // pendientes de implementar
  addInterests(interest:Interests): Observable<Interests>{
    // Este codigo agrega un usuario a la DB 
    return this.http.post<Interests>(`${this.apiURL}/Interests`, interest, httpOptions)
  }

  updateInterests(interest:Interests): Observable<Interests>{
    // Este codigo modifica el valor del usuario en la DB
    const url = `${this.apiURL}/Interests/${interest.id}`;
        return this.http.put<Interests>(url, interest)
  }

  getStudies(): Observable<Studies[]> {
    this.EndPoint = `${this.apiURL}/Studies?userId=${this.USERID}`
    return this.http.get<Studies[]>(this.EndPoint )
  }

  getLaboralCareer(): Observable<LaboralCareer[]> {
    this.EndPoint = `${this.apiURL}/LaboralCareer?userId=${this.USERID}`
    return this.http.get<LaboralCareer[]>(this.EndPoint )
  }


 







}
