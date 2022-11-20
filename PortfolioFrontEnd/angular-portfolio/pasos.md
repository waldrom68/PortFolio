# Angular File Structure

# app
 
  - ## core
    <!-- The CoreModule takes on the role of the app root module, but is not the module that gets bootstrapped by Angular at run-time. The common denominator between the files present here is that we only need to load them once, and that is at run-time, which makes them singleton. The module contains root-scoped services, static components like the navbar and footer, interceptors, guard, constants, enums, utils, and universal models. To prevent re-importing the module elsewhere, we should add a module-import-guard in it’s constructor method. -->
    - guards
      - auth.guard.ts
      - module-import.guard.ts
      - no-auth.guard.ts
    - interceptor
      - token.interceptor.ts
      - error.interceptor.ts
    - services
      - service-a.service.ts
      - service-b.service.ts
    - components
      - navbar
        - navbar.component.html | scss| ts
      - page-not-found
        - page-not-found.component.html | scss | ts
    - constants
      - constant-a.ts
      - constant-b.ts
    - enums
      - enum-a.ts
      - enum-b.ts
    - models
      - model-a.ts
      - model-b.ts
    - utils
      - common-functions.ts
  
  - ### features
    <!-- The initial Angular application does only have one single module, which works great for small applications. But as the application grows, you’ll need to consider subdividing it into multiple feature modules, some which can be lazy loaded. These modules should only depend on the SharedModule, and their functionality should be scoped to the module. When you need the service in other modules as well, it probably belongs in the CoreModule’ service’s declaration instead.-->
    - feature-a
      - components
        - scoped-shared-component-a
          - scoped-shared-component-a.component.html | scss | ts
        - scope-shared-component-b
          - scoped-shared-component-b.component.html | scss | ts

      - pages
        - page-a
            - page-a.component.html | scss | ts
        - page-b
            - page-b.component.html | scss | ts

      - models
        - scoped-model-a.model.ts
        - scoped-model-b.model.ts
        
      - services
        - scoped-service-a.service.ts
        - scoped-service-b.service.ts

      - feature-a-routing.module.ts
      - feature-a.module.ts
      - feature-a.component.html | scss | ts
      
  
  - ### shared
    <!-- Do declare components, directives, and pipes in a shared module when those items will be re-used and referenced by the components declared in other feature modules. Do export all symbols from the SharedModule that other feature modules need to use. The SharedModule allows us to organize and streamline our code. The shared module shouldn’t have any dependency to the rest of the application, and should therefore not rely on any other module. It should contain all the reusable modules, lazy loaded feature modules required to operate. You should add commonly used directives, pipes and components here. Many third-party libraries are available as NgModules such as Material Design, and exposing them through the SharedModule might be a good idea. -->
    - components
      - shared-button
        - shared-button.component.html | scss | ts
    - directives
        - shared-directive.ts
    - pipes
        - shared-pipe.ts
    - shared.module.ts
  
  - ### styles
    <!-- In a similar way to how we want to avoid bloating up the AppModule as the application grows, it’s also true for the styles.scss file.You should instead create a styles folder, which contains mixins or css-functions, responsible for their own areas. These files are then imported in the appropriate order inside the styles.scss file, providing their global styles to the rest of the app. Create mixins for reusable css-snippets, and scope the associated logic together. -->

    - app-loading.scss
    - company-colors.scss
    - spinners.scss
    - variables.scss
  
  - ### assets
      <!-- The assets folder is generated for us by the Angular CLI with the ng new command, and is the perfect place for storing all our media files. Using it in combination with a PathLocationStrategy gives easily referable files across the app. This folder persists at build time. -->
      - i18n
        - lang-a.json
        - lang-b.json
      - images
        - image-a.svg
        - image-b.svg
      - static
        - structure-a.json
        - structure-b.json
      - icons
      - custom-icon-a.svg
      - custom-icon-b.svg

  - ### styles.scss



## Complementos instalados
- npm i bootstrap jquery popper.js --save
- ng add @fortawesome/angular-fontawesome@
  https://www.npmjs.com/package/@fortawesome/angular-fontawesome

- npm install -g json-server --devDependencies
  API REST falsa completa sin codificación para desarrolladores front-end que necesitan un back-end rápido para crear prototipos y simulacros
  - agregar al package.json:
    "server": "json-server --watch db.json --port 5000"
  
  - Poner el servidor de json para ver nuestros datos
    npm run server



## ERRORES 

### NO LOGRO RENDERIZAR UN MULTILINEA QUE MANTENGA LOS PARRAFOR SEPARADOS (se resolvio usando .split() y manejandolo como un array)


// Último video completo de pildorasinformàticas:
// Video 19

// Video del ministerio, time 1:55:00, creacion uiService

### Consulta de icons
https://fontawesome.com/icons

## PENDIENTES
STRUC: En la estructura del proyecto, dicha estructura debiera replicarse en los submodulos de features. Actualmente dentro de features se cargan todos los componentes, habría que subdividirlo en sus dos partes/bloques de datos.


## INVESTIGAR
### ngx-cacheable is becoming ts-cacheable
https://www.npmjs.com/package/ts-cacheable


### MODELS:
Users
Studies
LaboralCareer
SoftSkill
HardSkill
Interests


### Modal
https://material.angular.io/guide/getting-started

https://levelup.gitconnected.com/how-to-create-a-reusable-modal-dialog-component-in-angular-8-241cc738d260

https://stackblitz.com/edit/ng-reusable-modal?file=src%2Fapp%2Fapp.module.ts,angular.json


### Splash Screen for Loading all the Data at Startup
https://plainenglish.io/blog/creating-a-splash-screen-in-angular-for-loading-all-the-data-at-startup-b0b91d9d9f93


### Evaluar el manejo de los servicios de forma async
 https://balramchavan.medium.com/using-async-await-feature-in-angular-587dd56fdc77



############################################################
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
  