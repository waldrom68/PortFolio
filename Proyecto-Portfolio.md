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


