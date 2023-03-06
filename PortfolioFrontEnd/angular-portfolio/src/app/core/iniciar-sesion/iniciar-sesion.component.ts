import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
// importamos las librerias de formulario que vamos a necesitar
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginUsuario } from 'src/app/models';
import { AuthService, AdminService } from 'src/app/service/auth.service';

import { TokenService } from 'src/app/service/token.service';


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

    private adminService: AdminService,


    private authService: AuthService,
    private tokenService: TokenService,

    private formBuilder: FormBuilder,
  ) {
    ///Creamos el grupo de controles para el formulario de login
    this.form = this.formBuilder.group({
      nombreUsuario: ["", [Validators.required, Validators.minLength(3)]],
      password: ["", [Validators.required, Validators.minLength(3)]],
    })


  }

  ngOnInit() {

    this.adminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );
  }

  ngOnDestroy() {

    this.adminServiceSubscription?.unsubscribe();

  }


  onLoggin(loginUsuario: LoginUsuario): void {

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
          this.adminService.setCurrentAdmin(true);

        }
      },
      error: (e) => {
        alert("Response Error (" + e.status + ") en iniciar.sesion.component" + "\n" + e.message);
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
