cd C:\Users\waldr\OneDrive\Documentos\Proyectos\Portfolio\PortfolioFrontEnd

git push main dev


Angular.

### Crear proyecto
ng new nombre-de-mi-proyecto

### Crear modulo
ng generate module <nombre-modulo>

### Crear un componente
ng generate components/component <nombre-del-componente> [opciones]


### Crear una directiva
ng g directives [nombre-de-la-directiva]

### Crear un servicio
ng generate service <nombre_modulo>/<nombre_servicio>

### Ejemplos con las directivas:
```js
export class AppComponent {
  armaduras = [
    'Mark I',
    'Mark II',
    'Mark III',
    'Mark IV',
    'Mark V',
    'Mark VI',
    'Mark XLII'
  ];
  usar = this.armaduras[2];
```

```html
<ul>
<li *ngFor="let armadura of armaduras">
     <b *ngIf="armadura == usar; else sinnegrita">{{armadura}} </b>
 <ng-template #sinnegrita> {{armadura}} </ng-template>
</li>
</ul>


<ul [ngSwitch]="usar">
<li *ngFor="let armadura of armaduras">
     {{armadura}} <b *ngSwitchCase="armadura"> < Hoy se usa ésta </b>
 </li>
</ul>
```

### Ejemplo con los binding

https://stackblitz.com/edit/argentinaprograma-intro-binding-uaxhvr?file=src%2Fapp%2Fapp.component.html&file=src%2Fapp%2Fapp.component.html,src%2Fapp%2Fapp.component.ts
``` html
<div>
      Nombre:
      <input 
        placeholder="Ingrese su nombre" 
        type="text" 
        [(ngModel)]="nombre" />  <!-- Viene del back y los cambios por cualquier evento puede tomarse desde el back -->
    </div>
    <br />
    <div>
      Teléfono:
      <input
        placeholder="ingrese su telefono"
        type="number"
        [ngModel]="telefono" /> <!-- Viene del back y los cambios el back lo tomaría por un submit -->
    </div>
    <br />
    <div>
      DNI:
      <input
        placeholder="ingrese su dni"
        type="number"
        [ngModel]="dni" 
        (ngModelChange)="cambiaDni($event)"/> <!-- DNI viene del back y ante evento de cambio, lo toma el back dentro de la funcion cambiaDni() -->
    </div>
```

### login form
https://stackblitz.com/edit/argentinaprograma-intro-formularios-awfgry?file=src%2Fapp%2Fapp.component.ts

``` ts
  get prueba() {
    if (this.Mail?.touched) {
      return this.Mail?.valid 
    } else {
      return true
    }
  }
```
``` html
  <input type="email" formControlName="email"
        [class.border-danger]="!prueba">
  <div>
    <p *ngIf="form.valid">Está todo bien!, ya puedes iniciar sesión</p>
      <button [disabled]="!form.valid" type="submit">Iniciar Sesión</button>
  </div>
```
### Angular Route Guards for Authentication
  https://levelup.gitconnected.com/angular-route-guards-for-authentication-d77fb01f04ae

### Validacion con expresiones regulares:
  Método estático que provee angular
  pattern(): requiere que el valor ingresado coincida con un patrón de expresiones regulares.
  