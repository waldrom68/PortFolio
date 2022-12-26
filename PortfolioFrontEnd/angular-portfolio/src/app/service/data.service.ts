import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Person, HardSkill, SoftSkill, Studies, LaboralCareer, Interest, Projects, PortfolioInit, Cards, User } from '../data'

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
  

  private USER: Person;

  private flagChangeUser: boolean = false;
  private flagChangeUser$ = new Subject<boolean>();



  constructor(  
        // inicializamos el metodo http
        private http: HttpClient
  ) { }

 
  getFlagUserAdmin() {
    return this.flagChangeUser
  }
  
  changeUser() {
    this.flagChangeUser = !this.flagChangeUser;
    this.flagChangeUser$.next( this.flagChangeUser);
  }

  getFlagChangeUser$(): Observable<boolean> {
    return this.flagChangeUser$.asObservable();
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

  getGralData(): Observable<Person> {
    return this.http.get<Person>(`${this.apiURL}/Person/${this.USERID}`)
  }

  updateGralData(user:Person): Observable<Person>{
    // Este codigo modifica el valor del usuario en la DB
    const url = `${this.apiURL}/Person/${user.id}`;
        return this.http.put<Person>(url, user)
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

  // Interest
  getInterests(): Observable<Interest[]> {
    this.EndPoint = `${this.apiURL}/Interest?userId=${this.USERID}`
    return this.http.get<Interest[]>(this.EndPoint )
  }
  delInterests(interest:Interest): Observable<Interest>{
    const url = `${this.apiURL}/Interest/${interest.id}`
    return this.http.delete<Interest>(url)
  }
  updateInterest(interest:Interest): Observable<Interest>{
    const url = `${this.apiURL}/Interest/${interest.id}`;
    return this.http.put<Interest>(url, interest)
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
  addInterests(interest:Interest): Observable<Interest>{
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    interest.userId = this.USERID;
    console.log(interest.constructor.name)
    return this.http.post<Interest>(`${this.apiURL}/Interest`, interest, httpOptions)
  }

  updateInterests(interest:Interest): Observable<Interest>{
    // Este codigo modifica el valor del usuario en la DB
    const url = `${this.apiURL}/Interest/${interest.id}`;
        return this.http.put<Interest>(url, interest)
  }





 







}
