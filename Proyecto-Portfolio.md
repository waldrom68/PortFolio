BASE de DATOS: MySQL
Alojamiento:
    https://app.koyeb.com/


BackEnd - Spring Boot

Inicializar proyecto:
https://start.spring.io/

    Maven
    Java
    Spring Boot version stable - sin parentesis -

    Project Metadata:
    Group: com.portfolio
    Artifact: wdr
    Name: wdr

    Packaging: JAR
    Java: 8

Dependencias:

    (PAra crear aplicaciones web, incluido RESTFull, y tiene el Tomcat)
    Spring Web Web:
    Build web, including RESTful, applications using Spring MVC. Uses Apache Tomcat as the default embedded container.

    (JPA para la persistencia de los datos)
    Spring Data JPA SQL
    Persist data in SQL stores with Java Persistence API using Spring Data and Hibernate.

    (para conectar la base del proyecto)
    MySQL Driver SQL
    MySQL JDBC driver.

    (validacion)
    Validation I/O
    Bean Validation with Hibernate validator.

    (Reinicio rapido para ver las configuraciones en tiempo real )
    Spring Boot DevTools Developer Tools
    Provides fast application restarts, LiveReload, and configurations for enhanced development experience.

    (@Anotattion para el codigo)
    Lombok Developer Tools
    Java annotation library which helps to reduce boilerplate code.

Generate para descargar el proyecto en un archivo zip. Todo su contenido lo descargo en la carpeta para el backend.

NetBeans, abrimos el proyecto descargado.

Para security: 
### https://www.youtube.com/watch?v=q8i5pIoBfgI&list=PLly5egcQSlfmDzqF4Of944eD2VPXxua42&index=19

Configuraciones iniciales.
    Agregar dependencias directamente en el pom.xml
        Desde mavenrepository: https://mvnrepository.com/
            Spring Boot Starter Security 
            JSON Web Token Support For The JVM
    Modificar Application.properties:
        jwt.secret = secret
        jwt.expiration = 3600

Implementar Authoritation:
    Dentro del source packages, pero dentro del paquete principal (un nivel mas bajo que los dto, repository,etc) creo un package para la seguridad. Es decir para este caso: com.portfolio.wdr.Security
        Aqui dentro van todas las clases e interfases para su funcionamiento (Entity, Repository, Service, etc.)






(configuramos los parametros para la conexion a la base de datos, ya sea local o la de un servicio de DB en la nube)
Abrimos el archivo -> C:\PortfolioBackEnd\src\main\resources\application.properties

Para crear crear un nuevo .jar pero reinstalando todas sus dependencias desde consola:
    mvnw clean
    mvnw install
    mvnw compile
    mvnw package

Luego para actualizarlo en el despliegue, si este está vinculado a la cuenta de github:
    git add .
    git commit
    git push


Para Correr el servicio backend el localhost desde la consola:
    java -jar c:/portfoliobackend/target/wdr-0.0.1-SNAPSHOT.jar

Alojamiento:
    https://app.koyeb.com/

Para verificar el funcionamiento del proyecto desplegado en el hosting:
    https://yoprogramo-waldrom68.koyeb.app/view/person/1


EndPoint's information:
### ACCESO AL BACKEND
[GET]  /auth/login                       | RequestBody | PUBLIC | Si existe Usuario, devuelve Bearer Token.

### CONFIGURACIONES GENERALES DEL PORTFOLIO
[GET]  /card/list/all                    |             | ADMIN  | Retorna Lista de los bloques de datos a mostrar.
[POST] /card/edit/IdCard                 | RequestBody | ADMIN  | Si existe ID es modificacion, caso contrario es un alta -maximo 8-
[POST] /displaydata/edit/{Iddisplaydata} | PathVariable| ADMIN  | Configuracion para visibilidad de objetos del PortFolio.
[POST] /displaydata/list                 |             | ADMIN  | Retorna Lista con las configuracions de visibilidad de objetos.

### ACCESO GENERAL DE DATOS DE LA PERSONA PARA EL PORTFOLIO
[POST] /fullperson/view/{IdPerson}       | PathVariable| USER   | Retorna Objeto Person, con los datos de sus Entidades relacionadas.

### DATOS DE LAS DIFERENTES ENTIDADES DE LA PERSONA
[POST] /degree/edit                        | RequestBody | ADMIN  | Si existe ID es modificacion, caso contrario es un alta.
[DEL]  /degree/del/{IdDegree}              | PathVariable| ADMIN  | Si existe ID es eliminacion, caso contrario notifica error.
[POST] /degree/list/{IdPerson}             | PathVariable| ADMIN  | Niveles de estudio relacionados a una persona.

[POST] /hardskill/edit                     | RequestBody | ADMIN  | Si existe ID es modificacion, caso contrario es un alta.
[DEL]  /hardskill/del/{IdHardskill}        | PathVariable| ADMIN  | Si existe ID es eliminacion, caso contrario notifica error.
[POST] /hardskill/list/{IdPerson}          | PathVariable| ADMIN  | Habilidades tecnicas relacionadas a una persona.

[POST] /interest/edit                      | RequestBody | ADMIN  | Si existe ID es modificacion, caso contrario es un alta.
[POST] /interest/new                       | RequestBody | ADMIN  | Alta.
[DEL]  /interest/del/{IdInterest}          | PathVariable| ADMIN  | Si existe ID es eliminacion, caso contrario notifica error.
[POST] /interest/list/{IdPerson}           | PathVariable| ADMIN  | Intereses relacionados a una persona.

[POST] /laboralcareer/edit                 | RequestBody | ADMIN  | Si existe ID es modificacion, caso contrario es un alta.
[DEL]  /laboralcareer/del/{IdLaboralcareer}| PathVariable| ADMIN  | Si existe ID es eliminacion, caso contrario notifica error.
[POST] /laboralcareer/list/{IdPerson}      | PathVariable| ADMIN  | Carrera Laboral relacionadas a una persona.

[POST] /organization/edit                  | RequestBody | ADMIN  | Si existe ID es modificacion, caso contrario es un alta.
[DEL]  /organization/del/{IdOrganization}  | PathVariable| ADMIN  | Si existe ID es eliminacion, caso contrario notifica error.
[POST] /organization/list/{IdPerson}       | PathVariable| ADMIN  | Organizaciones relacionadas a una persona.

[POST] /person/edit                        | RequestBody | ADMIN  | Si existe ID es modificacion, caso contrario es un alta.
[POST] /person/view/{IdPerson}             | PathVariable| ADMIN  | Organizaciones relacionadas a una persona.

[POST] /phone/edit                         | RequestBody | ADMIN  | Si existe ID es modificacion, caso contrario es un alta.
[DEL]  /phone/del/{IdPhone}                | PathVariable| ADMIN  | Si existe ID es eliminacion, caso contrario notifica error.
[POST] /phone/list/{IdPerson}              | PathVariable| ADMIN  | Telefonos relacionadas a una persona.

[POST] /project/edit                       | RequestBody | ADMIN  | Si existe ID es modificacion, caso contrario es un alta.
[DEL]  /project/del/{IdProject}            | PathVariable| ADMIN  | Si existe ID es eliminacion, caso contrario notifica error.
[POST] /project/list/{IdPerson}            | PathVariable| ADMIN  |  Proyectos relacionadas a una persona.

[POST] /projectmedia/edit                  | RequestBody | ADMIN  | Si existe ID es modificacion, caso contrario es un alta.
[DEL]  /projectmedia/del/{IdProject}       | PathVariable| ADMIN  | Si existe ID es eliminacion, caso contrario notifica error.
[POST] /projectmedia/list/{IdPerson}       | PathVariable| ADMIN  | Archivos multimedia de proyectos relacionadas a una persona.

[POST] /roleposition/edit                  | RequestBody | ADMIN  | Si existe ID es modificacion, caso contrario es un alta.
[DEL]  /roleposition/del/{IdRoleposition}  | PathVariable| ADMIN  | Si existe ID es eliminacion, caso contrario notifica error.
[POST] /roleposition/list/{IdPerson}       | PathVariable| ADMIN  | Posiciones o roles relacionadas a una persona.

[POST] /social/edit                        | RequestBody | ADMIN  | Si existe ID es modificacion, caso contrario es un alta.
[DEL]  /social/del/{IdSocial }             | PathVariable| ADMIN  | Si existe ID es eliminacion, caso contrario notifica error.
[POST] /social/list/{IdPerson}             | PathVariable| ADMIN  | Redes sociales relacionadas a una persona.

[POST] /softskill/edit                     | RequestBody | ADMIN  | Si existe ID es modificacion, caso contrario es un alta.
[DEL]  /softskill/del/{IdSoftskill}        | PathVariable| ADMIN  | Si existe ID es eliminacion, caso contrario notifica error.
[POST] /softskill/list/{IdPerson}          | PathVariable| ADMIN  | Habilidades sociales relacionadas a una persona.

[POST] /studie/edit                        | RequestBody | ADMIN  | Si existe ID es modificacion, caso contrario es un alta.
[DEL]  /studie/del/{IdStudie}              | PathVariable| ADMIN  | Si existe ID es eliminacion, caso contrario notifica error.
[POST] /studie/list/{IdPerson}             | PathVariable| ADMIN  | Estudios relacionados a una persona.



### Limitaciones y/o pendientes:
- El backend no brinda ningun servicio a traves de navegadores.

- Control de excepciones basico e incluso sin unificar los criterios en su implementación.

- Si bien la estructura de la DB y el backend lo contempla, como el FrontEnd por el momento solo adminitra el PortFolio de una sóla persona, no se debiera utilizar aún las altas/bajas de los objetos Person.

- Los objetos Card tienen informacion para la visibilidad de objetos del PortFolio y/o layout, por ahora estos tendrán los mismos atributos para todos los Objetos Person. 


## Investigar: Manejo de excepciones para API Rest
https://www.toptal.com/java/spring-boot-rest-api-error-handling


##################################################################################################################################
FrontEnd
Pasos para implementar en firebase, se debe instalar el paquete Firebase tools, para el transpilado del proyecto

    Se realiza una instalacion global de Firebase, la cual servirá para la instalacion de cuanto proyecto angular realice: 
        Desde el root del proyecto angular -> npm install -g firebase-tools

    Preparando entorno para el despliegue:
    Teniendo la cuenta en firebase, debo proceder al compilado del proyecto:
        <!-- ng build  // esto creará o actulizará la carpeta dist -->

        ng build --configuration=production

        firebase init // para subir/vincular proyecto de la nube con el del VSC
            opciones:
            ? Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices. Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
            ? What do you want to use as your public directory? dist/angular-portfolio
            - 
            ? Configure as a single-page app (rewrite all urls to /index.html)? No
            ? Set up automatic builds and deploys with GitHub? No
            +  Wrote dist/angular-portfolio/404.html
            ? File dist/angular-portfolio/index.html already exists. Overwrite? No

        firebase deploy // hace el despliegue en la nube.



Para correr la aplicacion frontend en localhost:
    cd C:\PortFolioWeb\Portfolio\PortfolioFrontEnd\angular-portfolio
    ng serve -o
    o
    ng serve --configuration=development

Para correr el servidor frontend en localhost:
    cd C:\PortFolioWeb\Portfolio\PortfolioFrontEnd\angular-portfolio
    npm run server

Para correr el frontend desplegado en firebase:
https://portfolio-frontend-wdr.web.app/




### Implementar Authoritation:
https://www.youtube.com/watch?v=q8i5pIoBfgI&list=PLly5egcQSlfmDzqF4Of944eD2VPXxua42&index=19

Video hasta 2 horas 28 minutos.

<!-- Para investigar cambiar los parametros de configuracion segun las etapas: Dev, Prod, Test, etc.
    Build Targets For Local, Dev, Stage and Prod

    https://benracicot.medium.com/customize-angulars-build-system-for-local-dev-stage-and-prod-53516c8bc311

-->