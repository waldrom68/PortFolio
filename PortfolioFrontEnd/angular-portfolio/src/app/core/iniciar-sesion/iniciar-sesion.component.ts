import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// importamos las librerias de formulario que vamos a necesitar
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUsuario } from 'src/app/models';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})

export class IniciarSesionComponent implements OnInit {
  @Output() toggleLoggin = new EventEmitter();

  isLoggin = false;
  // isLogginFail = false;
  loginUsuario!: LoginUsuario;
  // nombreUsuario!: string;
  // password: string;
  roles: string[];
  errMsj: string;


  form: FormGroup;
  // formData: User;
  // Inyectar en el constructor el formBuilder
  constructor(
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthService,
    private dataService: DataService,
    )
  
  { 
    ///Creamos el grupo de controles para el formulario de login
    this.form= this.formBuilder.group({
      nombreUsuario:["", [Validators.required, Validators.minLength(3)]],
      password:["",[Validators.required, Validators.minLength(3)]],
   })


  }

  ngOnInit() {

    if (this.dataService.getFlagUserAdmin()) {
      this.isLoggin = true;
      // this.isLogginFail = false;
    }

  }

  onLoggin(loginUsuario: LoginUsuario): void {
    // this.loginUsuario = new LoginUsuario(this.NombreUsuario?.value, this.Password?.value); 
    // this.loginUsuario = new LoginUsuario("user", "user"); 

    // this.authService.login(loginUsuario).subscribe( 
    //     data => {
    //       // this.isLoggin = true;
    //       // this.isLogginFail = false;
    //       this.tokenService.setToken(data.token);
    //       this.tokenService.setUserName(data.nombreUsuario);
    //       this.tokenService.setAuthorities(data.authorities);
    //       this.roles = data.authorities;
    //       // this.isLoggedChange.emit(this.isLogged)
    //       this.toggleLoggin.emit();
    //     }, err => {
    //       // this.isLoggin = false;
    //       // this.isLogginFail = true;
    //       this.errMsj = err.error.error;
    //       this.authService.logout();
    //       console.log("Resultado del inicio de sesion: ", this.errMsj)
    //       // this.isLoggedChange.emit(this.isLogged)
    //     }
    //   )
      this.authService.login(loginUsuario).subscribe( {
        next: (v) => {
          this.tokenService.setToken(v.token);
          this.tokenService.setUserName(v.nombreUsuario);
          this.tokenService.setAuthorities(v.authorities);
          this.roles = v.authorities;
          // this.isLoggedChange.emit(this.isLogged)
          // this.toggleLoggin.emit();
          if (this.tokenService.isAdmin()) {
            this.dataService.hasCredentials(true)
            console.log("Logueado correctamente como ADMIN")
          }
        },
        error: (e) => {
          alert("Response Error (" + e.status + ") en iniciar.sesion.component" + "\n" + e.message);
          console.log("Se quizo loguear sin exito como :" + loginUsuario.nombreUsuario)
          // this.dataService.hasCredentials(false)
          ;
        },
        complete: () => console.log("Finalizado el proceso de loggin")
      }
      );



  }

  get Password(){
    return this.form.get("password");
  }
 
  get NombreUsuario(){
   return this.form.get("nombreUsuario");
  }

  get PasswordValid(){
    return this.Password?.touched && !this.Password?.valid;
  }

  get NombreUsuarioValid() {
    return false
  }
 

  onEnviar(event: Event){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault(); 
    // console.log(this.form.valid, this.NombreUsuario?.value, this.Password?.value)
    if (this.form.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      // alert("Todo salio bien ¡Enviar formuario!")
      this.loginUsuario = new LoginUsuario(this.NombreUsuario?.value, this.Password?.value); 
      this.onLoggin(this.loginUsuario);
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.form.markAllAsTouched(); 
    }
 
  }


}
