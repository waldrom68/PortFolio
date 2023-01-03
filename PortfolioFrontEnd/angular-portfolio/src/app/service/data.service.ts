import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Person, HardSkill, SoftSkill, Studies, LaboralCareer, Interest, Project, PortfolioInit, Cards,Organization, Degree, RolePosition } from '../data'

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


  private flagChangeUser: boolean = true;
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
    return this.http.get<PortfolioInit>(`${this.apiURL}/PortfolioInit/?person=${this.USERID}`)
  }

  getPortFolioCards(): Observable<Cards[]> {
    
    console.log(`${this.apiURL}/Cards/?person=${this.USERID}`)
    return this.http.get<Cards[]>(`${this.apiURL}/Cards/?person=${this.USERID}`)
  }

  // Person - only get and put
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
    this.EndPoint = `${this.apiURL}/HardSkill?person=${this.USERID}`
    return this.http.get<HardSkill[]>(this.EndPoint )
  }
  delHardSkills(hardskill:HardSkill): Observable<HardSkill>{
    const url = `${this.apiURL}/HardSkill/${hardskill.id}`
    return this.http.delete<HardSkill>(url)
  }
  updateHardSkill(hardskill:HardSkill): Observable<HardSkill>{
    const url = `${this.apiURL}/HardSkill/${hardskill.id}`;
    return this.http.put<HardSkill>(url, hardskill)
  }
  addHardskill(hardskill:HardSkill): Observable<HardSkill>{
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    console.log(hardskill.constructor.name)
    hardskill.person = this.USERID;
    return this.http.post<HardSkill>(`${this.apiURL}/Hardskill`, hardskill, httpOptions)
  }

  // Interest
  getInterests(): Observable<Interest[]> {
    this.EndPoint = `${this.apiURL}/Interest?person=${this.USERID}`
    return this.http.get<Interest[]>(this.EndPoint )
  }
  updateInterest(interest:Interest): Observable<Interest>{
    // Este codigo modifica el valor del usuario en la DB
    const url = `${this.apiURL}/Interest/${interest.id}`;
    return this.http.put<Interest>(url, interest)
  }
  delInterests(interest:Interest): Observable<Interest>{
    const url = `${this.apiURL}/Interest/${interest.id}`
    return this.http.delete<Interest>(url)
  }
  addInterests(interest:Interest): Observable<Interest>{
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    console.log(interest.constructor.name)
    interest.person = this.USERID;
    return this.http.post<Interest>(`${this.apiURL}/Interest`, interest, httpOptions)
  }

  // SoftSkills
  getSoftSkill(): Observable<SoftSkill[]> {
  this.EndPoint = `${this.apiURL}/SoftSkill?person=${this.USERID}`
  return this.http.get<SoftSkill[]>(this.EndPoint )
  }

  delSoftSkill(softskill:SoftSkill): Observable<SoftSkill>{
  // Este codigo elimina de la DB al usuario
  const url = `${this.apiURL}/SoftSkill/${softskill.id}`
  return this.http.delete<SoftSkill>(url)
  }
  updateSoftSkill(softskill:SoftSkill): Observable<SoftSkill>{
  const url = `${this.apiURL}/SoftSkill/${softskill.id}`;
  return this.http.put<SoftSkill>(url, softskill)
  }
  addSoftskill(softskill:SoftSkill): Observable<SoftSkill>{
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    console.log(softskill.constructor.name)
    softskill.person = this.USERID;
    return this.http.post<SoftSkill>(`${this.apiURL}/SoftSkill`, softskill, httpOptions)
  }


  // Projects
  getProject(): Observable<Project[]> {
    this.EndPoint = `${this.apiURL}/Project?person=${this.USERID}`
    return this.http.get<Project[]>(this.EndPoint )
  }
  delProject(project:Project): Observable<Project>{
    const url = `${this.apiURL}/Project/${project.id}`
    return this.http.delete<Project>(url)
  }
  updateProject(project:Project): Observable<Project>{
    const url = `${this.apiURL}/Project/${project.id}`;
    return this.http.put<Project>(url, project)
  }
  addProject(project:Project): Observable<Project>{
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    console.log(project.constructor.name)
    project.person = this.USERID;
    return this.http.post<Project>(`${this.apiURL}/Project`, project, httpOptions)
  }

  // Organization
  getOrganization(): Observable<Organization[]> {
    this.EndPoint = `${this.apiURL}/Organization?person=${this.USERID}`
    return this.http.get<Organization[]>(this.EndPoint )
  }
  delOrganization(organization:Organization): Observable<Organization>{
    const url = `${this.apiURL}/Organization/${organization.id}`
    return this.http.delete<Organization>(url)
  }
  updateOrganization(organization:Organization): Observable<Organization>{
    const url = `${this.apiURL}/Organization/${organization.id}`;
    return this.http.put<Organization>(url, organization, httpOptions)
  }
  addOrganization(organization:Organization): Observable<Organization>{
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    organization.person = this.USERID;
    console.log(organization.constructor.name)
    return this.http.post<Organization>(`${this.apiURL}/Organization`, organization, httpOptions)
  }


  // Degree
  getDegree(): Observable<Degree[]> {
    this.EndPoint = `${this.apiURL}/Degree?person=${this.USERID}`
    return this.http.get<Degree[]>(this.EndPoint )
  }
  delDegree(degree:Degree): Observable<Degree>{
    const url = `${this.apiURL}/Degree/${degree.id}`
    return this.http.delete<Degree>(url)
  }
  updateDegree(degree:Degree): Observable<Degree>{
    const url = `${this.apiURL}/Degree/${degree.id}`;
    return this.http.put<Degree>(url, degree)
  }
  addDegree(degree:Degree): Observable<Degree>{
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    console.log(degree.constructor.name)
    degree.person = this.USERID;
    return this.http.post<Degree>(`${this.apiURL}/Degree`, degree, httpOptions)
  }


  // Laboral Career
  getLaboralCareer(): Observable<LaboralCareer[]> {
    this.EndPoint = `${this.apiURL}/LaboralCareer?person=${this.USERID}`
    return this.http.get<LaboralCareer[]>(this.EndPoint )
  }
  delLaboralCareers(career:LaboralCareer): Observable<LaboralCareer>{
    const url = `${this.apiURL}/LaboralCareer/${career.id}`
    return this.http.delete<LaboralCareer>(url)
  }
  updateLaboralCareer(career:LaboralCareer): Observable<LaboralCareer>{
    const url = `${this.apiURL}/LaboralCareer/${career.id}`;
    return this.http.put<LaboralCareer>(url, career)
  }
  addLaboralCareer(career:LaboralCareer): Observable<LaboralCareer>{
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    console.log(career.constructor.name)
    career.person = this.USERID;
    return this.http.post<LaboralCareer>(`${this.apiURL}/LaboralCareer`, career, httpOptions)
  }
  

  // pendientes de implementar

  // Studies
  getStudies(): Observable<Studies[]> {
    this.EndPoint = `${this.apiURL}/Studies?person=${this.USERID}`
    return this.http.get<Studies[]>(this.EndPoint )
  }
  delStudies(studie:Studies): Observable<Studies>{
    const url = `${this.apiURL}/Studies/${studie.id}`
    return this.http.delete<Studies>(url)
  }


// RolePosition
getRolePosition(): Observable<RolePosition[]> {
  this.EndPoint = `${this.apiURL}/RolePosition?person=${this.USERID}`
  return this.http.get<RolePosition[]>(this.EndPoint )
}
delRolePosition(rolePosition:RolePosition): Observable<RolePosition>{
  const url = `${this.apiURL}/RolePosition/${rolePosition.id}`
  return this.http.delete<RolePosition>(url)
}
updateRolePosition(rolePosition:RolePosition): Observable<RolePosition>{
  const url = `${this.apiURL}/RolePosition/${rolePosition.id}`;
  return this.http.put<RolePosition>(url, rolePosition, httpOptions)
}
addRolePosition(rolePosition:RolePosition): Observable<RolePosition>{
  console.log("estoy en el metodo del servicio")
  // Este codigo agrega un usuario a la DB 
  rolePosition.person = this.USERID;
  console.log(rolePosition.constructor.name)
  return this.http.post<RolePosition>(`${this.apiURL}/RolePosition`, rolePosition, httpOptions)
  
}



 







}
