import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
// importamos las librerias de formulario que vamos a necesitar
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginUsuario } from 'src/app/models';
import { AuthService, AdminService } from 'src/app/service/auth.service';
import { BaseDataService, DataService } from 'src/app/service/data.service';

import { TokenService } from 'src/app/service/token.service';
import { UiService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})

export class IniciarSesionComponent implements OnInit, OnDestroy {

  loginUsuario!: LoginUsuario;
  roles: string[];
  errMsj: string;

  form: FormGroup;

  esAdmin: boolean;
  private adminServiceSubscription: Subscription | undefined;


  // Inyectar en el constructor el formBuilder
  constructor(
    private uiService: UiService,

    private adminService: AdminService,
    private dataService: DataService,
    private baseDataService: BaseDataService,

    private authService: AuthService,
    private tokenService: TokenService,

    private formBuilder: FormBuilder,
  ) {
    this.adminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

  }

  ngOnInit() {


    ///Creamos el grupo de controles para el formulario de login
    this.form = this.formBuilder.group({
      nombreUsuario: ["", [Validators.required, Validators.minLength(3)]],
      password: ["", [Validators.required, Validators.minLength(3)]],
    })
  }

  ngOnDestroy() {

    // this.adminServiceSubscription?.unsubscribe();

  }


  onLoggin(loginUsuario: LoginUsuario): void {
    console.log("Intentando iniciar sesión, verificando credenciales");

    this.authService.login(loginUsuario).subscribe({
      next: (v) => {
        this.tokenService.setToken(v.token);
        this.tokenService.setUserName(v.nombreUsuario);
        this.tokenService.setAuthorities(v.authorities);
        this.roles = v.authorities;

        // Aperte de estar logueado, si es un Administrador valido
        if (this.tokenService.isAdmin()) {
          console.log('%c Prueba 1! %c Prueba 2!',
            'color: #1c87c9; background: #ccc; font-size: 20px;',
            'color: #8ebf42; background: # 666; font - size: 20 px;'
          );  // salida consola tipo ANSI

          console.log('Logueado correctamente como ADMIN!');
          this.uiService.msgboxOk(['Hola ' + loginUsuario.nombreUsuario],);
          this.adminService.setCurrentAdmin(true);

        // CODIGO DE PRUEBA, sirve para que al cambiar de usuario apunte al portfolio
        // de otra Persona.
        // FUNCIONA PARCIALMENTE, SI SE RECARGA VUELVE AL PORTFOLIO ID 1 NO SE CONTROLA
        // CUANDO EVALUA TOKEN VIGENTE, VER INTERRELACION ENTRE AUTH SERVICE, DATA SERVICE
        // O LOGIN SERVICE o nuevo KEY EN TOKEN PARA EVALUAR
        //  LA MEJOR LOCALIZACIÓN DE LA FUNCIONALIDAD.
        // 
          // PENDIENTE, regla de negocio no estandarizada
          // Se coloca a mano el tipo de usuario para testing y el id del Person a donde
          // apunta para levantar los datos. Debe manejarse con algun flag, cambio de
          // usuario, por ejemplo
          if (v.nombreUsuario == "TESTING") {
            // OBJECT DATA:
            // {
            //   "nombre": "TESTING",
            //   "nombreUsuario": "TESTING",
            //   "email": "testing@gmail.com",
            //   "password": "testing123"
            // }
            this.dataService.setUserID(7);
            this.dataService.getPortFolioData().subscribe({
              next: (currentData) => {
        
                this.uiService.msgboxOk( ['Datos obtenidos exitosamente'],);
        
                this.baseDataService.setCurrentBaseData(currentData);

                console.log("Obtenidos los datos exitosamente");
                
                // this.uiService.msgboxOk(['Datos guardados exitosamente'],);
                // this.uiService.msgboxOk(['Se ha eliminado exitosamentee'] ,);
        
              },
              error: (e) => {
                // e.status = 0, error del servidor
                // e.status = 400, e.statusText= OK, error en el pedido al servidor
                let msg = new Array()
                msg.push("Se quizo obtener los datos sin exito," + e.message)
               
                console.log("Se quizo obtener los datos sin exito; ")
                switch (e.status) {
                  case 0:
                    // error en el servidor
                    msg.push("Error en el servicio, reintente en unos minutos");
                    break
                  case 400:
                    if (e.statusText.toLowerCase() == "ok" ) {
                      // error en el pedido del servidor
                      msg.push("Error en la base de datos","Reintente en unos minutos");
                    }
                    break;
                };
                this.uiService.msgboxErr( msg,); 
                
              },
              complete: () => { console.log("Finalizado el proceso de obtener los datos del PortFolio") }
            });
          } 
        // FIN CODIGO DE PRUEBA

        }
      },
      error: (e) => {
        let msg = new Array()
        msg.push("Se quizo loguear sin exito como :" + loginUsuario.nombreUsuario);
        msg.push(e.error.mensaje ? e.error.mensaje : e.message);
        this.uiService.msgboxErr(msg,);

        console.log("Se quizo loguear sin exito como :" + loginUsuario.nombreUsuario)

        this.adminService.setCurrentAdmin(false);
        ;
      },
      complete: () => console.log("Finalizado el proceso de loggin")
    }
    );

  }

  get Password() {
    return this.form.get("password");
  }

  get NombreUsuario() {
    return this.form.get("nombreUsuario");
  }

  get PasswordValid() {
    return this.Password?.touched && !this.Password?.valid;
  }

  get NombreUsuarioValid() {
    return false
  }


  onEnviar(event: Event) {
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault();

    if (this.form.valid) {
      // Llamamos a nuestro servicio para enviar los datos al servidor
      this.loginUsuario = new LoginUsuario(this.NombreUsuario?.value, this.Password?.value);
      this.onLoggin(this.loginUsuario);

    } else {
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.form.markAllAsTouched();
    }

  }

}
