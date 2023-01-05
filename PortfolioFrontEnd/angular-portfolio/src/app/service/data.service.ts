import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Person, HardSkill, SoftSkill, LaboralCareer, Interest, Project, PortfolioInit, Cards,Organization, Degree, RolePosition, Studie } from '../data'

import { HttpClient, HttpHeaders } from '@angular/common/http'  // Para ejecutar los metodos GET, PUT, POST, ETC


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin':'*',
    // 'Authorization':'authkey',
  })
}


@Injectable({
  providedIn: 'root'
})

export class DataService {
  private apiURL = 'http://localhost:5000'
  private LOCALHOST_API = 'http://localhost:8080'
  private EndPoint:string = ""

  // PENDIENTE, vincular con el logging
  private USERID:number = 3; 
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

  // Person APIREST ########################################################
  getGralData(): Observable<Person> {
    console.log("El servicio va a buscar en Person API")
    return this.http.get<Person>(`${this.LOCALHOST_API}/view/person/${this.USERID}`)
    // return this.http.get<Person>("http://localhost:8080/view/person/1")
  }
  updateGralData(user:Person): Observable<Person>{
    // Este codigo modifica el valor del usuario en la DB
    console.log("El servicio va a modificar los datos en Person API")
    return this.http.post<Person>(`${this.LOCALHOST_API}/edit/person`, user, httpOptions)
    // const url = `http://localhost:8080/edit/person`;
    // return this.http.post<Person>(url, user, httpOptions)
  }

  // Interest APIREST ###################################################
  getInterests(): Observable<Interest[]> {
    this.EndPoint = `${this.LOCALHOST_API}/list/interest/${this.USERID}`
    return this.http.get<Interest[]>(this.EndPoint )
  }
  updateInterest(interest:Interest): Observable<Interest>{
    // Este codigo modifica el valor del usuario en la DB
    interest.person = this.USERID;
    const url = `${this.LOCALHOST_API}/edit/interest`;
    return this.http.post<Interest>(url, interest, httpOptions)
  }
  addInterests(interest:Interest): Observable<Interest>{
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    // console.log(interest.constructor.name)
    interest.person = this.USERID;
    const url = `${this.LOCALHOST_API}/edit/interest`
    return this.http.post<Interest>(url, interest, httpOptions)
  }
  delInterests(interest:Interest): Observable<Interest>{
    const url = `${this.LOCALHOST_API}/del/interest/${interest.id}`
    return this.http.delete<Interest>(url, httpOptions)
  }

  // HardSkills APIREST ###################################################
  getHardSkill(): Observable<HardSkill[]> {
    this.EndPoint = `${this.LOCALHOST_API}/list/hardskill/${this.USERID}`
    return this.http.get<HardSkill[]>(this.EndPoint )
  }
  updateHardSkill(hardskill:HardSkill): Observable<HardSkill>{
    hardskill.person = this.USERID;
    const url = `${this.LOCALHOST_API}/edit/hardskill`;
    return this.http.post<HardSkill>(url, hardskill, httpOptions)
  }
  addHardskill(hardskill:HardSkill): Observable<HardSkill>{
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    console.log(hardskill.constructor.name)
    hardskill.person = this.USERID;
    return this.http.post<HardSkill>(`${this.LOCALHOST_API}/edit/hardskill`, hardskill, httpOptions)
  }
  delHardSkills(hardskill:HardSkill): Observable<HardSkill>{
    const url = `${this.LOCALHOST_API}/del/hardskill/${hardskill.id}`
    return this.http.delete<HardSkill>(url, httpOptions)
  }


  // SoftSkills  APIREST ###################################################
  getSoftSkill(): Observable<SoftSkill[]> {
  this.EndPoint = `${this.LOCALHOST_API}/list/softskill/${this.USERID}`
  return this.http.get<SoftSkill[]>(this.EndPoint )
  }
  updateSoftSkill(softskill:SoftSkill): Observable<SoftSkill>{
  const url = `${this.LOCALHOST_API}/edit/softskill`;
  softskill.person = this.USERID;
  return this.http.post<SoftSkill>(url, softskill, httpOptions)
  }
  addSoftskill(softskill:SoftSkill): Observable<SoftSkill>{
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    console.log(softskill.constructor.name)
    softskill.person = this.USERID;
    return this.http.post<SoftSkill>(`${this.LOCALHOST_API}/edit/softskill`, softskill, httpOptions)
  }
  delSoftSkill(softskill:SoftSkill): Observable<SoftSkill>{
  // Este codigo elimina de la DB al usuario
  const url = `${this.LOCALHOST_API}/del/softskill/${softskill.id}`
  return this.http.delete<SoftSkill>(url, httpOptions)
  }


  // Projects  APIREST ###################################################
  getProject(): Observable<Project[]> {
    this.EndPoint = `${this.LOCALHOST_API}/list/project/${this.USERID}`
    return this.http.get<Project[]>(this.EndPoint )
  }
  addProject(project:Project): Observable<Project>{
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    console.log(project.constructor.name)
    project.person = this.USERID;
    return this.http.post<Project>(`${this.LOCALHOST_API}/edit/project`, project, httpOptions)
  }
  updateProject(project:Project): Observable<Project>{
    const url = `${this.LOCALHOST_API}/edit/project`;
    project.person = this.USERID;
    return this.http.post<Project>(url, project, httpOptions)
  }
  delProject(project:Project): Observable<Project>{
    const url = `${this.LOCALHOST_API}/del/project/${project.id}`
    return this.http.delete<Project>(url, httpOptions)
  }


  // Organization  APIREST ###################################################
  getOrganization(): Observable<Organization[]> {
    this.EndPoint = `${this.LOCALHOST_API}/list/organization/${this.USERID}`
    return this.http.get<Organization[]>(this.EndPoint )
  }
  updateOrganization(organization:Organization): Observable<Organization>{
    const url = `${this.LOCALHOST_API}/edit/organization`;
    organization.person = this.USERID;
    return this.http.post<Organization>(url, organization, httpOptions)
  }
  addOrganization(organization:Organization): Observable<Organization>{
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    organization.person = this.USERID;
    console.log(organization.constructor.name)
    return this.http.post<Organization>(`${this.LOCALHOST_API}/edit/organization`, organization, httpOptions)
  }
  delOrganization(organization:Organization): Observable<Organization>{
    const url = `${this.LOCALHOST_API}/del/organization/${organization.id}`
    return this.http.delete<Organization>(url)
  }

  // RolePosition  APIREST ###################################################
  getRolePosition(): Observable<RolePosition[]> {
    this.EndPoint = `${this.LOCALHOST_API}/list/roleposition/${this.USERID}`
    return this.http.get<RolePosition[]>(this.EndPoint )
  }
  updateRolePosition(rolePosition:RolePosition): Observable<RolePosition>{
    const url = `${this.LOCALHOST_API}/edit/roleposition`;
    rolePosition.person = this.USERID;
    return this.http.post<RolePosition>(url, rolePosition, httpOptions)
  }
  addRolePosition(rolePosition:RolePosition): Observable<RolePosition>{
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    console.log(rolePosition.constructor.name)
    rolePosition.person = this.USERID;
    return this.http.post<RolePosition>(`${this.LOCALHOST_API}/edit/roleposition`, rolePosition, httpOptions)
  }
  delRolePosition(rolePosition:RolePosition): Observable<RolePosition>{
    const url = `${this.LOCALHOST_API}/del/roleposition/${rolePosition.id}`
    return this.http.delete<RolePosition>(url, httpOptions)
  }


  // Degree  APIREST ###################################################
  getDegree(): Observable<Degree[]> {
    this.EndPoint = `${this.LOCALHOST_API}/list/degree/${this.USERID}`
    return this.http.get<Degree[]>(this.EndPoint )
  }
  updateDegree(degree:Degree): Observable<Degree>{
    const url = `${this.LOCALHOST_API}/edit/degree`;
    degree.person = this.USERID;
    return this.http.post<Degree>(url, degree, httpOptions)
  }
  addDegree(degree:Degree): Observable<Degree>{
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    console.log(degree.constructor.name)
    degree.person = this.USERID;
    return this.http.post<Degree>(`${this.LOCALHOST_API}/edit/degree`, degree, httpOptions)
  }
  delDegree(degree:Degree): Observable<Degree>{
    const url = `${this.LOCALHOST_API}/del/degree/${degree.id}`
    return this.http.delete<Degree>(url, httpOptions)
  }

  // Laboral Career  APIREST ###################################################
  getLaboralCareer(): Observable<LaboralCareer[]> {
    this.EndPoint = `${this.LOCALHOST_API}/list/laboralcareer/${this.USERID}`
    return this.http.get<LaboralCareer[]>(this.EndPoint )
  }
  updateLaboralCareer(career:LaboralCareer): Observable<LaboralCareer>{
    const url = `${this.LOCALHOST_API}/edit/laboralcareer`;
    career.person = this.USERID;
    return this.http.post<LaboralCareer>(url, career, httpOptions)
  }
  addLaboralCareer(career:LaboralCareer): Observable<LaboralCareer>{
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    console.log(career.constructor.name)
    console.log("estoy aqui", career)
    career.person = this.USERID;
    return this.http.post<LaboralCareer>(`${this.LOCALHOST_API}/edit/laboralcareer`, career, httpOptions)
  }
    delLaboralCareers(career:LaboralCareer): Observable<LaboralCareer>{
    const url = `${this.LOCALHOST_API}/del/laboralcareer/${career.id}`
    return this.http.delete<LaboralCareer>(url, httpOptions)
  }

  // pendientes de implementar

  // Studie
  getStudie(): Observable<Studie[]> {
    this.EndPoint = `${this.LOCALHOST_API}/list/studie/${this.USERID}`
    return this.http.get<Studie[]>(this.EndPoint )
  }
  updateStudie(studie:Studie): Observable<Studie>{
    const url = `${this.LOCALHOST_API}/edit/studie`;
    studie.person = this.USERID;
    return this.http.post<Studie>(url, studie, httpOptions)
  }
  addStudie(studie:Studie): Observable<Studie>{
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    studie.person = this.USERID;
    console.log(studie.constructor.name)
    return this.http.post<Studie>(`${this.LOCALHOST_API}/edit/studie`, studie, httpOptions)
  }
  delStudie(studie:Studie): Observable<Studie>{
    const url = `${this.LOCALHOST_API}/del/studie/${studie.id}`
    return this.http.delete<Studie>(url, httpOptions)
  }




 







}
