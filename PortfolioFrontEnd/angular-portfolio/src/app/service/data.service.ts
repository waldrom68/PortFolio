import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Person, HardSkill, SoftSkill, LaboralCareer, Interest, Project, Organization, Degree, RolePosition, Studie, FullPersonDTO, Card } from '../models'

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'  // Para ejecutar los metodos GET, PUT, POST, ETC
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*',
    // 'Authorization':'authkey',
  })
}


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private LOCALHOST_API = environment.apiURL
  private USERID: number = environment.idPersona;
  // private EndPoint: string = ""
  
  // private apiURL = 'http://localhost:5000'
  // PENDIENTE, vincular con el logging
  private USER: Person;

  // #######################################
  // Almacen y servicio de flag isLoggin
  // Primero crear el almacen del dato si es Administrador,
  //  el observado
  private isAdmin: boolean = false;
  // Segundo el subject será un elemento del servicio
  private isAdmin$: Subject<boolean> = new Subject<boolean>();

  // Se utiliza para detectar el logueo de usuario
  private flagChangeUser: boolean = false;
  private flagChangeUser$ = new Subject<boolean>();
  // fin logueo de usuario
  
  
  // Fin Almacen y servicio de flag isLoggin
  
  
  
  // PENDIENTE EVALUAR RELEVANCIA
  // Se preparó para implementar en progressValue de los uploads
  private currentValue: number;
  private currentValue$ = new Subject<number>();
  // 
  // FIN PENDIENTE EVALUAR RELEVANCIA
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
  
  //FIN PENDIENTE  Metodos en evaluacion, deben ser ereemplazados

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

  // Actualmente usado para setear el registro de persona para Testing
  setUserID(id:number): void {
    this.USERID = id;
  }

 
  // #### Nuevos metodos, con la implementacion del control de acceso  ###
  getFlagUserAdmin() {
    return this.flagChangeUser
  }
  getFlagChangeUser$(): Observable<boolean> {
    return this.flagChangeUser$.asObservable();
  }
  hasCredentials(value: boolean) {
    // console.log("hasCredentials",value);
    
    this.flagChangeUser = value;
    this.flagChangeUser$.next(this.flagChangeUser);
  }

  // #### Nuevo metodo de acceso general a todos los datos del backend
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


  
  // #### Nuevo metodo de acceso general para traer las Card del portfolio
  private gralCard: Card;
  private gralCard$ = new Subject<Card>();
  
  getPortFolioCard(): Observable<Card> {
    const endPoint = `${this.LOCALHOST_API}/card/list/all`
    return this.http.get<Card>(endPoint)
  }
  getPortFolioCard$(): Observable<Card> {
    return this.gralCard$.asObservable();
  }





  // ########### Codigo implementado nuevo
  upDateEntity(entidad: any, entityName: string): Observable<any> {
    entidad.person = this.USERID;
    const url = `${this.LOCALHOST_API}${entityName}/edit`;
    console.log(url)
    console.log("Modificando a ... ", entidad);
    console.log("httpOptions", httpOptions);
    return this.http.post<any>(url, entidad, httpOptions)
  }

  addEntity(entidad: any, entityName: string): Observable<any> {
    entidad.person = this.USERID;
    entidad.id = -1;
    const url = `${this.LOCALHOST_API}${entityName}/new`;
    console.log(url)
    console.log("Agregando a ... ", entidad);
    console.log("httpOptions", httpOptions);
    return this.http.put<any>(url, entidad, httpOptions)
  }
  
  delEntity(entidad: any, entityName: string): Observable<any> {
    const url = `${this.LOCALHOST_API}${entityName}/del/${entidad.id}`
    console.log(url)
    console.log("Eliminando a ... ", entidad);
    console.log("httpOptions", httpOptions);
    
    return this.http.delete<any>(url, httpOptions)
  }

  // delHardSkills(hardskill:HardSkill): Observable<HardSkill>{
  //   const url = `${this.LOCALHOST_API}/hardskill/del/${hardskill.id}`
  //   return this.http.delete<HardSkill>(url, httpOptions)
  // }


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
      data.urlLocation,
      data.displaydata
    ))
  }


// https://rafaelneto.dev/blog/gestionar-estado-angular-rxjs-behaviorsubject-servicios-datos-observables/

// Una vez realizado el pedido a la DB, con este servicio mantengo un espejo de esa informacion
@Injectable({
  providedIn: 'root'
})
export class BaseDataService {
  private baseDataSubject: BehaviorSubject<FullPersonDTO> = new BehaviorSubject({} as FullPersonDTO);
  public readonly currentBaseData: Observable<FullPersonDTO> = this.baseDataSubject.asObservable();


  constructor() { }
  // Actualizo los datos de la persona del PortFolio
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

  @Injectable({
    providedIn: 'root'
  })
  export class BaseCardService {
  
    private BaseCardSubject: BehaviorSubject<Card> = new BehaviorSubject( {} as Card);
    public readonly currentBaseCard: Observable<Card> = this.BaseCardSubject.asObservable();
  
    constructor() { }
    
    // Actualizo los datos de las Card del PortFolio
    setCurrentBaseCard(currentCard: Card): void {
      
      this.BaseCardSubject.next(currentCard);
  
    }

  
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


