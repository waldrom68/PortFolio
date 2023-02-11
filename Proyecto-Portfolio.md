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


Para Correr el servicio backend en el localhost:
    java -jar c:/portfoliobackend/target/wdr-0.0.1-SNAPSHOT.jar

Alojamiento:
    https://app.koyeb.com/

Para verificar el funcionamiento del proyecto desplegado en el hosting:
    https://yoprogramo-waldrom68.koyeb.app/view/person/1



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



Para correr el servidor frontend en localhost:
    cd C:\PortFolioWeb\Portfolio\PortfolioFrontEnd\angular-portfolio
    ng serve -o

Para correr la aplicacion frontend en localhost:
    cd C:\PortFolioWeb\Portfolio\PortfolioFrontEnd\angular-portfolio
    npm run server


<!-- Para investigar cambiar los parametros de configuracion segun las etapas: Dev, Prod, Test, etc.
    Build Targets For Local, Dev, Stage and Prod

    https://benracicot.medium.com/customize-angulars-build-system-for-local-dev-stage-and-prod-53516c8bc311

-->