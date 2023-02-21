import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Person, HardSkill, SoftSkill, LaboralCareer, Interest, Project, Organization, Degree, RolePosition, Studie, FullPersonDTO } from '../models'

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'  // Para ejecutar los metodos GET, PUT, POST, ETC
import { environment } from 'src/environments/environment';


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
  // private apiURL = 'http://localhost:5000'
  private LOCALHOST_API = environment.apiURL
  private EndPoint: string = ""

  // PENDIENTE, vincular con el logging
  private USERID: number = environment.idPersona;
  private USER: Person;


  private flagChangeUser: boolean = false;
  private flagChangeUser$ = new Subject<boolean>();

  // PENDIENTE, no se está usando, validar necesidad de existencia
  // private handleError(error: HttpErrorResponse) {
  //   if (error.status === 0) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     // PENDIENTE redirigir a una pagina de error en servidor
  //     console.error('OJO, An error occurred:', error.error);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, body was: `, error.error);
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(() => new Error('Something bad happened; please try again later.'));
  // }

  constructor(
    // inicializamos el metodo http
    private http: HttpClient,
  ) { }

  //################PENDIENTE  Metodos en evaluacion, deben ser ereemplazados
  setUSER(user: Person) {
    this.USER = user
  }
  getUSER() {
    return this.USER;
  }
  gerUserID() {
    return this.USERID
  }

  getData() {
    return this.gralData;
  }

  changeUser() {
    this.flagChangeUser = !this.flagChangeUser;
    this.flagChangeUser$.next(this.flagChangeUser);
  }
  changeGralData(data: FullPersonDTO) {
    this.gralData = data;
    this.gralData$.next(this.gralData);
  }

  updateGralData(user: Person): Observable<Person> {
    // Este codigo modifica el valor del usuario en la DB
    console.log("El servicio va a modificar los datos en Person API")
    return this.http.post<Person>(`${this.LOCALHOST_API}/person/edit`, user, httpOptions)
    // const url = `http://localhost:8080/edit/person`;
    // return this.http.post<Person>(url, user, httpOptions)
  }


  
  // getPortFolioInit(): Observable<PortfolioInit> {

  //   return this.http.get<PortfolioInit>(`${this.apiURL}/PortfolioInit/?person=${this.USERID}`)
  // }

  // getPortFolioCards(): Observable<Cards[]> {

  //   console.log(`${this.apiURL}/Cards/?person=${this.USERID}`)
  //   return this.http.get<Cards[]>(`${this.apiURL}/Cards/?person=${this.USERID}`)
  // }
  //########### FIN PENDIENTE  Metodos en evaluacion, deben ser ereemplazados

  // Person APIREST ########################################################
  // getGralData(): Observable<Person> {
  //   console.log("El servicio va a buscar en Person API")
  //   const response = this.http.get<Person>(`${this.LOCALHOST_API}/person/view/${this.USERID}`).pipe(catchError(this.handleError));

  //   return response;
  //   // return this.http.get<Person>("http://localhost:8080/view/person/1")
  // }


  // #### Nuevos metodos, con la implementacion del control de acceso  ###
  getFlagUserAdmin() {
    return this.flagChangeUser
  }
  getFlagChangeUser$(): Observable<boolean> {
    return this.flagChangeUser$.asObservable();
  }
  hasCredentials(value:boolean) {
    this.flagChangeUser = value;
    this.flagChangeUser$.next(this.flagChangeUser);
  }

  // #### Nuevo metodo de acceso general a los datos del backend
  private gralData: FullPersonDTO;
  private gralData$ = new Subject<FullPersonDTO>();

  getPortFolioData(): Observable<FullPersonDTO> {
    const endPoint = `${this.LOCALHOST_API}/fullperson/view/${this.USERID}`
    const response = this.http.get<FullPersonDTO>(endPoint)
      // .pipe(catchError(this.handleError));
    return response;
  }
  getPortFolioData$(): Observable<FullPersonDTO> {
    return this.gralData$.asObservable();
  }




  // getInterests(): Interest[] {
  //   return this.gralData.interest;
  // }



  // ## Fin Nuevos metodos, con la implementacion del control de acceso ##

  // Interest APIREST ###################################################
  // getInterests(): Observable<Interest[]> {
  //   this.EndPoint = `${this.LOCALHOST_API}/interest/list/${this.USERID}`
  //   return this.http.get<Interest[]>(this.EndPoint)
  // }
  updateInterest(interest: Interest): Observable<Interest> {
    console.log("estoy en el metodo updateInteres del servicio")
    // Este codigo modifica el valor del usuario en la DB
    interest.person = this.USERID;
    console.log("recibo: ", interest)
    const url = `${this.LOCALHOST_API}/interest/edit`;
    return this.http.post<Interest>(url, interest, httpOptions)
  }
  addInterests(interest: Interest): Observable<Interest> {
    console.log("estoy en el metodo addInteres del servicio")
    // Este codigo agrega un usuario a la DB 
    interest.person = this.USERID;
    const url = `${this.LOCALHOST_API}/interest/new`;
    return this.http.put<Interest>(url, interest, httpOptions)
  }
  delInterests(interest: Interest): Observable<Interest> {
    const url = `${this.LOCALHOST_API}/interest/del/${interest.id}`
    return this.http.delete<Interest>(url, httpOptions)
  }

  // HardSkills APIREST ###################################################
  // getHardSkill(): Observable<HardSkill[]> {
  //   this.EndPoint = `${this.LOCALHOST_API}/hardskill/list/${this.USERID}`
  //   return this.http.get<HardSkill[]>(this.EndPoint)
  // }
  updateHardSkill(hardskill: HardSkill): Observable<HardSkill> {
    hardskill.person = this.USERID;
    const url = `${this.LOCALHOST_API}/hardskill/edit`;
    return this.http.post<HardSkill>(url, hardskill, httpOptions)
  }
  addHardskill(hardskill: HardSkill): Observable<HardSkill> {
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    console.log(hardskill.constructor.name)
    hardskill.person = this.USERID;
    return this.http.put<HardSkill>(`${this.LOCALHOST_API}/hardskill/new`, hardskill, httpOptions)
  }
  delHardSkills(hardskill: HardSkill): Observable<HardSkill> {
    const url = `${this.LOCALHOST_API}/hardskill/del/${hardskill.id}`
    return this.http.delete<HardSkill>(url, httpOptions)
  }


  // SoftSkills  APIREST ###################################################
  getSoftSkill(): Observable<SoftSkill[]> {
    this.EndPoint = `${this.LOCALHOST_API}/softskill/list/${this.USERID}`
    return this.http.get<SoftSkill[]>(this.EndPoint)
  }
  updateSoftSkill(softskill: SoftSkill): Observable<SoftSkill> {
    const url = `${this.LOCALHOST_API}/edit/softskill`;
    softskill.person = this.USERID;
    return this.http.post<SoftSkill>(url, softskill, httpOptions)
  }
  addSoftskill(softskill: SoftSkill): Observable<SoftSkill> {
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    console.log(softskill.constructor.name)
    softskill.person = this.USERID;
    return this.http.post<SoftSkill>(`${this.LOCALHOST_API}/edit/softskill`, softskill, httpOptions)
  }
  delSoftSkill(softskill: SoftSkill): Observable<SoftSkill> {
    // Este codigo elimina de la DB al usuario
    const url = `${this.LOCALHOST_API}/del/softskill/${softskill.id}`
    return this.http.delete<SoftSkill>(url, httpOptions)
  }


  // Projects  APIREST ###################################################
  getProject(): Observable<Project[]> {
    this.EndPoint = `${this.LOCALHOST_API}/project/list/${this.USERID}`
    return this.http.get<Project[]>(this.EndPoint)
  }
  addProject(project: Project): Observable<Project> {
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    console.log(project.constructor.name)
    project.person = this.USERID;
    return this.http.post<Project>(`${this.LOCALHOST_API}/edit/project`, project, httpOptions)
  }
  updateProject(project: Project): Observable<Project> {
    const url = `${this.LOCALHOST_API}/edit/project`;
    project.person = this.USERID;
    return this.http.post<Project>(url, project, httpOptions)
  }
  delProject(project: Project): Observable<Project> {
    const url = `${this.LOCALHOST_API}/del/project/${project.id}`
    return this.http.delete<Project>(url, httpOptions)
  }


  // Organization  APIREST ###################################################
  getOrganization(): Observable<Organization[]> {
    this.EndPoint = `${this.LOCALHOST_API}/organization/list/${this.USERID}`
    return this.http.get<Organization[]>(this.EndPoint)
  }
  updateOrganization(organization: Organization): Observable<Organization> {
    const url = `${this.LOCALHOST_API}/edit/organization`;
    organization.person = this.USERID;
    return this.http.post<Organization>(url, organization, httpOptions)
  }
  addOrganization(organization: Organization): Observable<Organization> {
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    organization.person = this.USERID;
    console.log(organization.constructor.name)
    return this.http.post<Organization>(`${this.LOCALHOST_API}/edit/organization`, organization, httpOptions)
  }
  delOrganization(organization: Organization): Observable<Organization> {
    const url = `${this.LOCALHOST_API}/del/organization/${organization.id}`
    return this.http.delete<Organization>(url)
  }

  // RolePosition  APIREST ###################################################
  getRolePosition(): Observable<RolePosition[]> {
    this.EndPoint = `${this.LOCALHOST_API}/roleposition/list/${this.USERID}`
    return this.http.get<RolePosition[]>(this.EndPoint)
  }
  updateRolePosition(rolePosition: RolePosition): Observable<RolePosition> {
    const url = `${this.LOCALHOST_API}/edit/roleposition`;
    rolePosition.person = this.USERID;
    return this.http.post<RolePosition>(url, rolePosition, httpOptions)
  }
  addRolePosition(rolePosition: RolePosition): Observable<RolePosition> {
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    console.log(rolePosition.constructor.name)
    rolePosition.person = this.USERID;
    return this.http.post<RolePosition>(`${this.LOCALHOST_API}/edit/roleposition`, rolePosition, httpOptions)
  }
  delRolePosition(rolePosition: RolePosition): Observable<RolePosition> {
    const url = `${this.LOCALHOST_API}/del/roleposition/${rolePosition.id}`
    return this.http.delete<RolePosition>(url, httpOptions)
  }


  // Degree  APIREST ###################################################
  getDegree(): Observable<Degree[]> {
    this.EndPoint = `${this.LOCALHOST_API}/degree/list/${this.USERID}`
    return this.http.get<Degree[]>(this.EndPoint)
  }
  updateDegree(degree: Degree): Observable<Degree> {
    const url = `${this.LOCALHOST_API}/edit/degree`;
    degree.person = this.USERID;
    return this.http.post<Degree>(url, degree, httpOptions)
  }
  addDegree(degree: Degree): Observable<Degree> {
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    console.log(degree.constructor.name)
    degree.person = this.USERID;
    return this.http.post<Degree>(`${this.LOCALHOST_API}/edit/degree`, degree, httpOptions)
  }
  delDegree(degree: Degree): Observable<Degree> {
    const url = `${this.LOCALHOST_API}/del/degree/${degree.id}`
    return this.http.delete<Degree>(url, httpOptions)
  }

  // Laboral Career  APIREST ###################################################
  getLaboralCareer(): Observable<LaboralCareer[]> {
    this.EndPoint = `${this.LOCALHOST_API}/laboralcareer/list/${this.USERID}`
    return this.http.get<LaboralCareer[]>(this.EndPoint)
  }
  updateLaboralCareer(career: LaboralCareer): Observable<LaboralCareer> {
    const url = `${this.LOCALHOST_API}/edit/laboralcareer`;
    career.person = this.USERID;
    return this.http.post<LaboralCareer>(url, career, httpOptions)
  }
  addLaboralCareer(career: LaboralCareer): Observable<LaboralCareer> {
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    console.log("estoy aqui", career)
    career.person = this.USERID;
    return this.http.post<LaboralCareer>(`${this.LOCALHOST_API}/edit/laboralcareer`, career, httpOptions)
  }
  delLaboralCareers(career: LaboralCareer): Observable<LaboralCareer> {
    const url = `${this.LOCALHOST_API}/del/laboralcareer/${career.id}`
    return this.http.delete<LaboralCareer>(url, httpOptions)
  }

  // pendientes de implementar

  // Studie
  getStudie(): Observable<Studie[]> {
    this.EndPoint = `${this.LOCALHOST_API}/studie/list/${this.USERID}`
    return this.http.get<Studie[]>(this.EndPoint)
  }
  updateStudie(studie: Studie): Observable<Studie> {
    const url = `${this.LOCALHOST_API}/edit/studie`;
    studie.person = this.USERID;
    return this.http.post<Studie>(url, studie, httpOptions)
  }
  addStudie(studie: Studie): Observable<Studie> {
    console.log("estoy en el metodo del servicio")
    // Este codigo agrega un usuario a la DB 
    studie.person = this.USERID;
    console.log(studie.constructor.name)
    return this.http.post<Studie>(`${this.LOCALHOST_API}/edit/studie`, studie, httpOptions)
  }
  delStudie(studie: Studie): Observable<Studie> {
    const url = `${this.LOCALHOST_API}/del/studie/${studie.id}`
    return this.http.delete<Studie>(url, httpOptions)
  }












}
