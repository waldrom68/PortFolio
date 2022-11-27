import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Users, HardSkill, SoftSkill, Studies, LaboralCareer, Interests, Projects, PortfolioInit, Cards } from '../data'


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

  // codigo que se recibe desde un message-box service
  alertDelete(modalData: any) {
    alert("Product with ID " + modalData.productId + " has been deleted.");
  }
  alertLogout(modalData: any) {
    alert("Are you sure you want to logout " + modalData.userId + "?");
  }
  alertInterest(modalData: any) {
    console.log("Are you sure you want to del interest?");
    console.log("y recibo este parametro", modalData)
  }


  gerUserID() {
    return this.USERID
  }

  getPortFolioInit(): Observable<PortfolioInit> {
    return this.http.get<PortfolioInit>(`${this.apiURL}/PortfolioInit/?userId=${this.USERID}`)
  }

  getPortFolioCards(): Observable<Cards[]> {
    
    console.log(`${this.apiURL}/Cards/?userId=${this.USERID}`)
    return this.http.get<Cards[]>(`${this.apiURL}/Cards/?userId=${this.USERID}`)
  }

  getGralData(): Observable<Users> {
    return this.http.get<Users>(`${this.apiURL}/Users/${this.USERID}`)
  }

  updateGralData(user:Users): Observable<Users>{
    // Este codigo modifica el valor del usuario en la DB
    const url = `${this.apiURL}/Users/${user.id}`;
        return this.http.put<Users>(url, user)
  }


  // HardSkills
  getHardSkill(): Observable<HardSkill[]> {
    this.EndPoint = `${this.apiURL}/HardSkills?userId=${this.USERID}`
    return this.http.get<HardSkill[]>(this.EndPoint )
  }
  delHardSkills(softskill:HardSkill): Observable<HardSkill>{
    const url = `${this.apiURL}/HardSkills/${softskill.id}`
    return this.http.delete<HardSkill>(url)
  }

  // Interests
  getInterests(): Observable<Interests[]> {
    this.EndPoint = `${this.apiURL}/Interests?userId=${this.USERID}`
    return this.http.get<Interests[]>(this.EndPoint )
  }
  delInterests(interest:Interests): Observable<Interests>{
    const url = `${this.apiURL}/Interests/${interest.id}`
    return this.http.delete<Interests>(url)
  }
  updateInterest(interest:Interests): Observable<Interests>{
    const url = `${this.apiURL}/Interests/${interest.id}`;
    return this.http.put<Interests>(url, interest)
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
    const url = `${this.apiURL}/Projects/${projects.id}`
    return this.http.delete<Projects>(url)
  }

  // Studies
  getStudies(): Observable<Studies[]> {
    this.EndPoint = `${this.apiURL}/Studies?userId=${this.USERID}`
    return this.http.get<Studies[]>(this.EndPoint )
  }
  delStudies(studie:Studies): Observable<Studies>{
    const url = `${this.apiURL}/Studies/${studie.id}`
    return this.http.delete<Studies>(url)
  }

  // Laboral Career
  getLaboralCareer(): Observable<LaboralCareer[]> {
    this.EndPoint = `${this.apiURL}/LaboralCareer?userId=${this.USERID}`
    return this.http.get<LaboralCareer[]>(this.EndPoint )
  }
  delLaboralCareers(career:LaboralCareer): Observable<LaboralCareer>{
    const url = `${this.apiURL}/LaboralCareer/${career.id}`
    return this.http.delete<LaboralCareer>(url)
  }





  // pendientes de implementar
  addInterests(interest:Interests): Observable<Interests>{
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    interest.userId = this.USERID;
    console.log(interest.constructor.name)
    return this.http.post<Interests>(`${this.apiURL}/Interests`, interest, httpOptions)
  }

  updateInterests(interest:Interests): Observable<Interests>{
    // Este codigo modifica el valor del usuario en la DB
    const url = `${this.apiURL}/Interests/${interest.id}`;
        return this.http.put<Interests>(url, interest)
  }





 







}
