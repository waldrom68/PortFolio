import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
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

  // #######################################
  // Almacen y servicio de flag isLoggin
  // Primero crear el almacen del dato si es Administrador,
  //  el observado
  private isAdmin: boolean = false;
  // Segundo el subject será un elemento del servicio
  private isAdmin$: Subject<boolean> = new Subject<boolean>();

  // Fin Almacen y servicio de flag isLoggin
  private myImage: string;
  // Segundo el subject será un elemento del servicio
  private myImage$: Subject<string> = new Subject<string>();

 // #######################################
  // Almacen y servicio de flag showForm
  // Primero crear el almacen del dato si es Administrador,
  //  el observado
  private showForm2: boolean = false;
  // Segundo el subject será un elemento del servicio
  private showForm2$: Subject<boolean> = new Subject<boolean>();

  // Fin Almacen y servicio de flag isLoggin




  private currentValue: number;
  private currentValue$ = new Subject<number>();

 
  
  
  private flagChangeUser: boolean = false;
  private flagChangeUser$ = new Subject<boolean>();
  
  // ################################################
  // PENDIENTE DE ELIMINAR ESTA PRACTCA CON OBSERVER
  // ################################################
  // Primero crear el almacen del dato color, el que será observado
  private color: string;
  // Segundo el subject será un elemento del servicio
  private color$: Subject<string> = new Subject<string>();
  // Tercero el metodo que realizará la emision del evento de 
  // actualizacion del dato color
  setColor(color: string) {
    // console.log("en setcolor() recibo ", color)
    this.color = color;
    this.color$.next(this.color);
  }
  // Por último, la generación del observer, entregará a todos 
  // aquellos componentes que quieran observar cambios en color
  // Este observable es capaz de vigilar el dato color
  getColor$(): Observable<string> {
    return this.color$.asObservable();
  }
  // Ahora, en cada componente que necesitemos estar 
  // atentos a los cambios del almacén de datos, o son responsables de cambiar su valor, podemos 
  // usar el observable que nos ofrece el servicio.
  // Primero se lo declara:
  //    colorSubscription: Subscription;  // esto es para poderlo eliminar
  //    color: string;  // el atributo que tendrá el valor actualizado
  //    color$: Observable<string>;
  // 
  // Segundo se inyecta en el constructor el servicio
  // 
  //    private dataService: DataService,
  // 
  // Tercero paso es crear la suscripcion a los eventos que 
  // nos estregará el observable. Dentro del ngOnInit()
  //    Aqui se accede al observable, que escucha los eventos:
  // 
  //        this.color$ = this.[servicename].getColor$();  
  // 
  //    Con la suscripción se logra que cada vez que cambia el
  //    el valor de color (en el servicio), actualiza la propiedad 
  //    del componente al nuevo valor del dato color. 
  // 
  //        this.color$.subscribe(color => this.color = color);
  // 
  //  Para terminar, no se recomienda dejar en memoria suscripciones
  //  (optimizacion de recursos)
  //  Dentro del método ngOnDestroy() -se ejecuta cuando un componente
  //  deja de existir, es decir lo contrario a ngOnInit().
  //  
  //    ngOnDestroy() {
  //      this.colorSubscription.unsubscribe();
  //    }
  // 
  // En el template:
  // {{color$ | async }} ó {{color}} 



  // ################################################









  // PENDIENTE, no se está usando, validar necesidad de existencia
  // SEGURO PODRIA SERVIR PARA VALIDAR LA OBTENCION DE GRALDATA AL INICIAR
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      // PENDIENTE redirigir a una pagina de error en servidor
      console.error('OJO, An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  constructor(
    // inicializamos el metodo http
    private http: HttpClient,
  ) { }

  // #######################################
  // Metodos del servicio de flag isLoggin
  // Nueva IMPLEMENTACION
  setIsAdmin(isAdmin: boolean) {
    console.log("isAdmin, en almacen de datos, lo seteo como -> ", isAdmin)
    this.isAdmin = isAdmin;
    this.isAdmin$.next(this.isAdmin);
  }
  // Este observable es capaz de vigilar el dato isAdmin y se lo
  //  entregará a aquellos componentes que se subscribieron.
  getIsAdmin$(): Observable<boolean> {
    // console.log("isAdmin, en almacen de datos, tiene registrado -> ", this.isAdmin, `(llamado desde ${desde})`);
    return this.isAdmin$.asObservable();
  }

  adminStatus() {
    return this.isAdmin;
  }

  // Fin Metodos del servicio de flag isLoggin



  //################PENDIENTE  Metodos en evaluacion, deben ser ereemplazados
  // PENDIENTE DE ELIMINAR, TRAS ELIMINAR COMPONENTE USER
  // Lo usa el componente USER que fue una prueba
  setUSER(user: Person) {
    this.USER = user
  }
  // PENDIENTE DE ELIMINAR, TRAS ADECUACION A NUEVA VERSION
  // USANDO UNA SUBSCRIPCION A DATAPORTFOLIO.
  // Objetive.component y profile.component
  getUSER() {
    return this.USER;
  }
  // gerUserID() {
  //   return this.USERID
  // }
  //   
  // changeUser() {
  //   this.flagChangeUser = !this.flagChangeUser;
  //   this.flagChangeUser$.next(this.flagChangeUser);
  // }

  getData() {
    // Lo usan todos los componentes para tomar los
    // datos de DATAPORTFOLIO.
    return this.gralData;
  }

  changeGralData(data: FullPersonDTO) {
    // Metodo que actualiza con nuevos valores para DATAPORTFOLIO
    this.gralData = data;
    this.gralData$.next(this.gralData);
  }

  updateGralData(persona: Person): Observable<Person> {
    // Este codigo modifica los valores de person en la DB, si la actualizacion
    // en DB es exitosa, debiera ejecutarse el metodo changeGralData(nuewData)
    console.log("El servicio va a modificar los datos en Person API")
    return this.http.post<Person>(`${this.LOCALHOST_API}/person/edit`, persona, httpOptions)
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
  hasCredentials(value: boolean) {
    this.flagChangeUser = value;
    this.flagChangeUser$.next(this.flagChangeUser);
  }

  // #### Nuevo metodo de acceso general a todos los datos del backend
  private gralData: FullPersonDTO;
  private gralData$ = new Subject<FullPersonDTO>();
  
  
 
  getPortFolioData(): Observable<FullPersonDTO> {
    const endPoint = `${this.LOCALHOST_API}/fullperson/view/${this.USERID}`
    const response = this.http.get<FullPersonDTO>(endPoint, httpOptions)
    .pipe(catchError(this.handleError));
    return response;
  }
  getPortFolioData$(): Observable<FullPersonDTO> {
    return this.gralData$.asObservable();
  }




  // ########### Codigo implementado nuevo
  upDateEntity(entidad: any, entityName: string): Observable<any> {
    entidad.person = this.USERID;
    const url = `${this.LOCALHOST_API}${entityName}/edit`;
    console.log(url)
    console.log("Modificando a ... ", entidad);
    return this.http.post<any>(url, entidad, httpOptions)
  }

  addEntity(entidad: any, entityName: string): Observable<any> {
    entidad.person = this.USERID;
    entidad.id = -1;
    const url = `${this.LOCALHOST_API}${entityName}/new`;
    console.log(url)
    console.log("Agregando a ... ", entidad);
    return this.http.put<any>(url, entidad, httpOptions)
  }
  
  delEntity(entidad: any, entityName: string): Observable<any> {
    const url = `${this.LOCALHOST_API}${entityName}/del/${entidad.id}`
    console.log(url)
    console.log("Eliminando a ... ", entidad);
    return this.http.delete<any>(url, httpOptions)
  }


  setCurrentValue(value:number) {
    this.currentValue = value;
    this.currentValue$.next(this.currentValue);
    // console.log("RECIBO", value);
    
  }

  getCurrentValue$(): Observable<number> {
    return this.currentValue$.asObservable();
  }


}

  // PENDIENTE, REVEER ESTA FUNCION, PENSARLA COMO UN METODO
  // DE LA CLASE FullPersonDTO, o Person.
  //  JSON tal vez?
  export function ToPerson(data: FullPersonDTO): any {
    return Object.assign(new Person(
      data.id,
      data.name,
      data.lastName,
      data.pathFoto,
      data.location,
      data.profession,
      data.profile,
      data.objetive,
      data.since,
      data.email,
      data.pathBgImage,
      data.displaydata
    ))
  }


// https://rafaelneto.dev/blog/gestionar-estado-angular-rxjs-behaviorsubject-servicios-datos-observables/
@Injectable({
  providedIn: 'root'
})
export class BaseDataService {
  private baseDataSubject: BehaviorSubject<FullPersonDTO> = new BehaviorSubject({} as FullPersonDTO);
  public readonly currentBaseData: Observable<FullPersonDTO> = this.baseDataSubject.asObservable();

  constructor() { }
  
  setCurrentBaseData(currentData: FullPersonDTO): void {
    
    this.baseDataSubject.next(currentData);
  }

  // codigo en el componente que usa este servicio tanto como observador como modificador.
  // baseData: FullPersonDTO;
  // private BaseDataServiceSubscription: Subscription | undefined;
  // constructor()
  // private baseDataService: BaseDataService,
  // 
  // ngOnInit()
  // this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
  //   currentData => {
  //     this.baseData = currentData;
  //   }
  //   );
  // 
  // codigo en el componente que modifica los datos de este servicio:
  // this.baseDataService.setCurrentBaseData( nuevoDato );  
  // ngOnDestroy() {

  //   this.BaseDataServiceSubscription?.unsubscribe();

  }


  // Fin Metodos del servicio de flag isLoggin


// PENDIENTE implementar un logout si el usuario no tiene actividad, ver idea en:
// https://fullstackdeveloper.guru/2020/03/25/how-to-check-user-inactivity-in-angular/
  @Injectable({
    providedIn: 'root'
  })
  export class ObservableService{
 
    createObservableService(): Observable<Date>{  // 1
   
        return new Observable(  // 2
            observer => {   // 3
                setInterval(() =>
                    observer.next(new Date())  // 4
                , 1000);
            }
        );
    }
  }


