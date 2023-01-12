```bash
C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot (fulldev)
λ rd target
El directorio no está vacío.

C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot (fulldev)
λ rd /S /Q target

C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot (fulldev)
λ dir
 El volumen de la unidad C es Windows
 El número de serie del volumen es: EC83-EB93

 Directorio de C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot

11/01/2023  20:52    <DIR>          .
11/01/2023  20:52    <DIR>          ..
07/01/2023  11:40               538 .gitignore
17/12/2022  11:17    <DIR>          .mvn
07/01/2023  15:51               195 Dockerfile
05/01/2023  19:30             9.100 endpoint.md
15/12/2022  11:21             1.233 HELP.md
19/12/2022  23:29            10.600 mvnw
19/12/2022  23:29             6.922 mvnw.cmd
07/01/2023  15:54             2.733 nbactions.xml
09/01/2023  19:55             2.405 pom.xml
19/12/2022  23:29    <DIR>          src
               8 archivos         33.726 bytes
               4 dirs  557.764.980.736 bytes libres

C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot (fulldev)
λ java -version
java version "19.0.1" 2022-10-18
Java(TM) SE Runtime Environment (build 19.0.1+10-21)
Java HotSpot(TM) 64-Bit Server VM (build 19.0.1+10-21, mixed mode, sharing)

C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot (fulldev)
λ javac -version
javac 19.0.1

C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot (fulldev)
λ echo %JAVA_HOME%
C:\Program Files\Java\jdk-19

C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot (fulldev)
λ
C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot (fulldev)
λ mvm
"mvm" no se reconoce como un comando interno o externo,
programa o archivo por lotes ejecutable.

C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot (fulldev)
λ mvnw clean
[INFO] Scanning for projects...
[INFO]
[INFO] ----------------------< com.portfolio:SpringBoot >----------------------
[INFO] Building SpringBoot 0.0.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- maven-clean-plugin:3.2.0:clean (default-clean) @ SpringBoot ---
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  0.508 s
[INFO] Finished at: 2023-01-11T20:54:13-03:00
[INFO] ------------------------------------------------------------------------

C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot (fulldev)
λ mvnw install
[INFO] Scanning for projects...
[INFO]
[INFO] ----------------------< com.portfolio:SpringBoot >----------------------
[INFO] Building SpringBoot 0.0.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- maven-resources-plugin:3.3.0:resources (default-resources) @ SpringBoot ---
[INFO] Copying 1 resource
[INFO] Copying 0 resource
[INFO]
[INFO] --- maven-compiler-plugin:3.10.1:compile (default-compile) @ SpringBoot ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 89 source files to C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot\target\classes
[INFO] /C:/PortFolioWeb/Portfolio/PortfolioBackEnd/SpringBoot/src/main/java/com/portfolio/SpringBoot/service/SocialNetworkService.java: Some input files use unchecked or unsafe operations.
[INFO] /C:/PortFolioWeb/Portfolio/PortfolioBackEnd/SpringBoot/src/main/java/com/portfolio/SpringBoot/service/SocialNetworkService.java: Recompile with -Xlint:unchecked for details.
[INFO]
[INFO] --- maven-resources-plugin:3.3.0:testResources (default-testResources) @ SpringBoot ---
[INFO] skip non existing resourceDirectory C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot\src\test\resources
[INFO]
[INFO] --- maven-compiler-plugin:3.10.1:testCompile (default-testCompile) @ SpringBoot ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 1 source file to C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot\target\test-classes
[INFO]
[INFO] --- maven-surefire-plugin:2.22.2:test (default-test) @ SpringBoot ---
[INFO]
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] Running com.portfolio.SpringBoot.ApplicationTests
20:55:21.114 [main] DEBUG org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Neither @ContextConfiguration nor @ContextHierarchy found for test class [ApplicationTests]: using SpringBootContextLoader
20:55:21.118 [main] DEBUG org.springframework.test.context.support.AbstractContextLoader - Could not detect default resource locations for test class [com.portfolio.SpringBoot.ApplicationTests]: no resource found for suffixes {-context.xml, Context.groovy}.
20:55:21.118 [main] INFO org.springframework.test.context.support.AnnotationConfigContextLoaderUtils - Could not detect default configuration classes for test class [com.portfolio.SpringBoot.ApplicationTests]: ApplicationTests does not declare any static, non-private, non-final, nested classes annotated with @Configuration.
20:55:21.154 [main] DEBUG org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Using ContextCustomizers for test class [ApplicationTests]: [ExcludeFilterContextCustomizer, DuplicateJsonObjectContextCustomizer, MockitoContextCustomizer, TestRestTemplateContextCustomizer, DisableObservabilityContextCustomizer, PropertyMappingContextCustomizer, Customizer]
20:55:21.254 [main] DEBUG org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider - Identified candidate component class: file [C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot\target\classes\com\portfolio\SpringBoot\Application.class]
20:55:21.262 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Found @SpringBootConfiguration com.portfolio.SpringBoot.Application for test class com.portfolio.SpringBoot.ApplicationTests
20:55:21.406 [main] DEBUG org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Using TestExecutionListeners for test class [ApplicationTests]: [ServletTestExecutionListener, DirtiesContextBeforeModesTestExecutionListener, ApplicationEventsTestExecutionListener, MockitoTestExecutionListener, DependencyInjectionTestExecutionListener, DirtiesContextTestExecutionListener, TransactionalTestExecutionListener, SqlScriptsTestExecutionListener, EventPublishingTestExecutionListener, ResetMocksTestExecutionListener, RestDocsTestExecutionListener, MockRestServiceServerResetTestExecutionListener, MockMvcPrintOnlyOnFailureTestExecutionListener, WebDriverTestExecutionListener, MockWebServiceServerTestExecutionListener]
20:55:21.410 [main] DEBUG org.springframework.test.context.support.AbstractDirtiesContextTestExecutionListener - Before test class: class [ApplicationTests], class annotated with @DirtiesContext [false] with mode [null]

  .   ____          _            __ _ _
 /\\ / ____ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | _ | _| | _ \/  | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
    |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.0.0)

2023-01-11T20:55:21.904-03:00  INFO 4348 --- [           main] c.portfolio.SpringBoot.ApplicationTests  : Starting ApplicationTests using Java 19.0.1 with PID 4348 (started by waldr in C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot)
2023-01-11T20:55:21.908-03:00  INFO 4348 --- [           main] c.portfolio.SpringBoot.ApplicationTests  : No active profile set, falling back to 1 default profile: "default"
2023-01-11T20:55:22.829-03:00  INFO 4348 --- [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2023-01-11T20:55:23.045-03:00  INFO 4348 --- [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 198 ms. Found 15 JPA repository interfaces.
Loading class com.mysql.jdbc.Driver. This is deprecated. The new driver class is com.mysql.cj.jdbc.Driver. The driver is automatically registered via the SPI and manual loading of the driver class is generally unnecessary.
2023-01-11T20:55:23.833-03:00  INFO 4348 --- [           main] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing PersistenceUnitInfo [name: default]
2023-01-11T20:55:23.937-03:00  INFO 4348 --- [           main] org.hibernate.Version                    : HHH000412: Hibernate ORM core version 6.1.5.Final
2023-01-11T20:55:24.181-03:00  WARN 4348 --- [           main] org.hibernate.orm.deprecation            : HHH90000021: Encountered deprecated setting [javax.persistence.sharedCache.mode], use [jakarta.persistence.sharedCache.mode] instead
2023-01-11T20:55:24.410-03:00  INFO 4348 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2023-01-11T20:55:24.414-03:00  WARN 4348 --- [           main] c.zaxxer.hikari.util.DriverDataSource    : Registered driver with driverClassName=com.mysql.jdbc.Driver was not found, trying direct instantiation.
2023-01-11T20:55:26.298-03:00  INFO 4348 --- [           main] com.zaxxer.hikari.pool.HikariPool        : HikariPool-1 - Added connection com.mysql.cj.jdbc.ConnectionImpl@79add732
2023-01-11T20:55:26.302-03:00  INFO 4348 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
2023-01-11T20:55:26.693-03:00  INFO 4348 --- [           main] SQL dialect                              : HHH000400: Using dialect: org.hibernate.dialect.MySQLDialect
2023-01-11T20:56:46.458-03:00  INFO 4348 --- [           main] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]
2023-01-11T20:56:46.470-03:00  INFO 4348 --- [           main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit "default"
2023-01-11T20:56:47.526-03:00  WARN 4348 --- [           main] JpaBaseConfiguration$JpaWebConfiguration : spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning
###### WebConfig class ######
Wed Jan 11 20:56:47 ART 2023
2023-01-11T20:56:48.178-03:00  INFO 4348 --- [           main] c.portfolio.SpringBoot.ApplicationTests  : Started ApplicationTests in 86.727 seconds (process running for 87.997)
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 87.62 s - in com.portfolio.SpringBoot.ApplicationTests
2023-01-11T20:56:48.603-03:00  INFO 4348 --- [ionShutdownHook] j.LocalContainerEntityManagerFactoryBean : Closing JPA EntityManagerFactory for persistence unit "default"
2023-01-11T20:56:48.603-03:00  INFO 4348 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2023-01-11T20:56:51.732-03:00  INFO 4348 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.
[INFO]
[INFO] Results:
[INFO]
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
[INFO]
[INFO]
[INFO] --- maven-jar-plugin:3.3.0:jar (default-jar) @ SpringBoot ---
[INFO] Building jar: C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot\target\SpringBoot-0.0.1-SNAPSHOT.jar
[INFO]
[INFO] --- spring-boot-maven-plugin:3.0.0:repackage (repackage) @ SpringBoot ---
[INFO] Replacing main artifact with repackaged archive
[INFO]
[INFO] --- maven-install-plugin:3.0.1:install (default-install) @ SpringBoot ---
[INFO] Installing C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot\pom.xml to C:\Users\waldr\.m2\repository\com\portfolio\SpringBoot\0.0.1-SNAPSHOT\SpringBoot-0.0.1-SNAPSHOT.pom
[INFO] Installing C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot\target\SpringBoot-0.0.1-SNAPSHOT.jar to C:\Users\waldr\.m2\repository\com\portfolio\SpringBoot\0.0.1-SNAPSHOT\SpringBoot-0.0.1-SNAPSHOT.jar
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  01:41 min
[INFO] Finished at: 2023-01-11T20:56:53-03:00
[INFO] ------------------------------------------------------------------------

C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot (fulldev)
λ mvnw compile
[INFO] Scanning for projects...
[INFO]
[INFO] ----------------------< com.portfolio:SpringBoot >----------------------
[INFO] Building SpringBoot 0.0.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- maven-resources-plugin:3.3.0:resources (default-resources) @ SpringBoot ---
[INFO] Copying 1 resource
[INFO] Copying 0 resource
[INFO]
[INFO] --- maven-compiler-plugin:3.10.1:compile (default-compile) @ SpringBoot ---
[INFO] Nothing to compile - all classes are up to date
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  1.416 s
[INFO] Finished at: 2023-01-11T20:59:37-03:00
[INFO] ------------------------------------------------------------------------

C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot (fulldev)
λ mvnw package
[INFO] Scanning for projects...
[INFO]
[INFO] ----------------------< com.portfolio:SpringBoot >----------------------
[INFO] Building SpringBoot 0.0.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- maven-resources-plugin:3.3.0:resources (default-resources) @ SpringBoot ---
[INFO] Copying 1 resource
[INFO] Copying 0 resource
[INFO]
[INFO] --- maven-compiler-plugin:3.10.1:compile (default-compile) @ SpringBoot ---
[INFO] Nothing to compile - all classes are up to date
[INFO]
[INFO] --- maven-resources-plugin:3.3.0:testResources (default-testResources) @ SpringBoot ---
[INFO] skip non existing resourceDirectory C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot\src\test\resources
[INFO]
[INFO] --- maven-compiler-plugin:3.10.1:testCompile (default-testCompile) @ SpringBoot ---
[INFO] Nothing to compile - all classes are up to date
[INFO]
[INFO] --- maven-surefire-plugin:2.22.2:test (default-test) @ SpringBoot ---
[INFO]
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] Running com.portfolio.SpringBoot.ApplicationTests
20:59:57.103 [main] DEBUG org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Neither @ContextConfiguration nor @ContextHierarchy found for test class [ApplicationTests]: using SpringBootContextLoader
20:59:57.107 [main] DEBUG org.springframework.test.context.support.AbstractContextLoader - Could not detect default resource locations for test class [com.portfolio.SpringBoot.ApplicationTests]: no resource found for suffixes {-context.xml, Context.groovy}.
20:59:57.107 [main] INFO org.springframework.test.context.support.AnnotationConfigContextLoaderUtils - Could not detect default configuration classes for test class [com.portfolio.SpringBoot.ApplicationTests]: ApplicationTests does not declare any static, non-private, non-final, nested classes annotated with @Configuration.
20:59:57.149 [main] DEBUG org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Using ContextCustomizers for test class [ApplicationTests]: [ExcludeFilterContextCustomizer, DuplicateJsonObjectContextCustomizer, MockitoContextCustomizer, TestRestTemplateContextCustomizer, DisableObservabilityContextCustomizer, PropertyMappingContextCustomizer, Customizer]
20:59:57.271 [main] DEBUG org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider - Identified candidate component class: file [C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot\target\classes\com\portfolio\SpringBoot\Application.class]
20:59:57.279 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Found @SpringBootConfiguration com.portfolio.SpringBoot.Application for test class com.portfolio.SpringBoot.ApplicationTests
20:59:57.425 [main] DEBUG org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Using TestExecutionListeners for test class [ApplicationTests]: [ServletTestExecutionListener, DirtiesContextBeforeModesTestExecutionListener, ApplicationEventsTestExecutionListener, MockitoTestExecutionListener, DependencyInjectionTestExecutionListener, DirtiesContextTestExecutionListener, TransactionalTestExecutionListener, SqlScriptsTestExecutionListener, EventPublishingTestExecutionListener, ResetMocksTestExecutionListener, RestDocsTestExecutionListener, MockRestServiceServerResetTestExecutionListener, MockMvcPrintOnlyOnFailureTestExecutionListener, WebDriverTestExecutionListener, MockWebServiceServerTestExecutionListener]
20:59:57.427 [main] DEBUG org.springframework.test.context.support.AbstractDirtiesContextTestExecutionListener - Before test class: class [ApplicationTests], class annotated with @DirtiesContext [false] with mode [null]

  .   ____          _            __ _ _
 /\\ / ____ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | _ | _| | _ \/ _ | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
    |____| .__|_| |_|_| |_\__ | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.0.0)

2023-01-11T20:59:57.916-03:00  INFO 7352 --- [           main] c.portfolio.SpringBoot.ApplicationTests  : Starting ApplicationTests using Java 19.0.1 with PID 7352 (started by waldr in C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot)
2023-01-11T20:59:57.919-03:00  INFO 7352 --- [           main] c.portfolio.SpringBoot.ApplicationTests  : No active profile set, falling back to 1 default profile: "default"
2023-01-11T20:59:58.829-03:00  INFO 7352 --- [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2023-01-11T20:59:59.002-03:00  INFO 7352 --- [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 163 ms. Found 15 JPA repository interfaces.
Loading class "com.mysql.jdbc.Driver. This is deprecated. The new driver class is "com.mysql.cj.jdbc.Driver. The driver is automatically registered via the SPI and manual loading of the driver class is generally unnecessary.
2023-01-11T20:59:59.769-03:00  INFO 7352 --- [           main] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing PersistenceUnitInfo [name: default]
2023-01-11T20:59:59.869-03:00  INFO 7352 --- [           main] org.hibernate.Version                    : HHH000412: Hibernate ORM core version 6.1.5.Final
2023-01-11T21:00:00.135-03:00  WARN 7352 --- [           main] org.hibernate.orm.deprecation            : HHH90000021: Encountered deprecated setting [javax.persistence.sharedCache.mode], use [jakarta.persistence.sharedCache.mode] instead
2023-01-11T21:00:00.392-03:00  INFO 7352 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2023-01-11T21:00:00.400-03:00  WARN 7352 --- [           main] c.zaxxer.hikari.util.DriverDataSource    : Registered driver with driverClassName=com.mysql.jdbc.Driver was not found, trying direct instantiation.
2023-01-11T21:00:02.317-03:00  INFO 7352 --- [           main] com.zaxxer.hikari.pool.HikariPool        : HikariPool-1 - Added connection com.mysql.cj.jdbc.ConnectionImpl@4c635edc
2023-01-11T21:00:02.319-03:00  INFO 7352 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
2023-01-11T21:00:02.713-03:00  INFO 7352 --- [           main] SQL dialect                              : HHH000400: Using dialect: org.hibernate.dialect.MySQLDialect
2023-01-11T21:01:23.170-03:00  INFO 7352 --- [           main] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]
2023-01-11T21:01:23.180-03:00  INFO 7352 --- [           main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit "default"
2023-01-11T21:01:24.181-03:00  WARN 7352 --- [           main] JpaBaseConfiguration$JpaWebConfiguration : spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning
###### WebConfig class ######
Wed Jan 11 21:01:24 ART 2023
2023-01-11T21:01:24.941-03:00  INFO 7352 --- [           main] c.portfolio.SpringBoot.ApplicationTests  : Started ApplicationTests in 87.454 seconds (process running for 88.68)
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 88.39 s - in com.portfolio.SpringBoot.ApplicationTests
2023-01-11T21:01:25.361-03:00  INFO 7352 --- [ionShutdownHook] j.LocalContainerEntityManagerFactoryBean : Closing JPA EntityManagerFactory for persistence unit "default"
2023-01-11T21:01:25.373-03:00  INFO 7352 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2023-01-11T21:01:27.957-03:00  INFO 7352 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.
[INFO]
[INFO] Results:
[INFO]
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
[INFO]
[INFO]
[INFO] --- maven-jar-plugin:3.3.0:jar (default-jar) @ SpringBoot ---
[INFO]
[INFO] --- spring-boot-maven-plugin:3.0.0:repackage (repackage) @ SpringBoot ---
[INFO] Replacing main artifact with repackaged archive
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  01:34 min
[INFO] Finished at: 2023-01-11T21:01:29-03:00
[INFO] ------------------------------------------------------------------------

C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot (fulldev)
λ dir
 El volumen de la unidad C es Windows
 El número de serie del volumen es: EC83-EB93

 Directorio de C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot

11/01/2023  20:55    <DIR>          .
11/01/2023  20:55    <DIR>          ..
07/01/2023  11:40               538 .gitignore
17/12/2022  11:17    <DIR>          .mvn
07/01/2023  15:51               195 Dockerfile
05/01/2023  19:30             9.100 endpoint.md
15/12/2022  11:21             1.233 HELP.md
19/12/2022  23:29            10.600 mvnw
19/12/2022  23:29             6.922 mvnw.cmd
07/01/2023  15:54             2.733 nbactions.xml
09/01/2023  19:55             2.405 pom.xml
19/12/2022  23:29    <DIR>          src
11/01/2023  20:56    <DIR>          target
               8 archivos         33.726 bytes
               5 dirs  557.741.334.528 bytes libres

C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot (fulldev)
λ cd target

C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot\target (fulldev)
λ dir
 El volumen de la unidad C es Windows
 El número de serie del volumen es: EC83-EB93

 Directorio de C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot\target

11/01/2023  20:56    <DIR>          .
11/01/2023  20:56    <DIR>          ..
11/01/2023  20:55    <DIR>          classes
11/01/2023  20:55    <DIR>          generated-sources
11/01/2023  20:55    <DIR>          generated-test-sources
11/01/2023  20:56    <DIR>          maven-archiver
11/01/2023  20:55    <DIR>          maven-status
11/01/2023  20:56        44.662.289 SpringBoot-0.0.1-SNAPSHOT.jar
11/01/2023  20:56            90.152 SpringBoot-0.0.1-SNAPSHOT.jar.original
11/01/2023  20:56    <DIR>          surefire-reports
11/01/2023  20:55    <DIR>          test-classes
               2 archivos     44.752.441 bytes
               9 dirs  557.741.072.384 bytes libres

C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot\target (fulldev)
λ java -jar SpringBoot-0.0.1-SNAPSHOT.jar

  .   ____          _            __ _ _
 /\\ / ___"_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | "_ | "_| | "_ \/ _" | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  "  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.0.0)

2023-01-11T21:05:38.461-03:00  INFO 6824 --- [           main] com.portfolio.SpringBoot.Application     : Starting Application v0.0.1-SNAPSHOT using Java 19.0.1 with PID 6824 (C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot\target\SpringBoot-0.0.1-SNAPSHOT.jar started by waldr in C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot\target)
2023-01-11T21:05:38.469-03:00  INFO 6824 --- [           main] com.portfolio.SpringBoot.Application     : No active profile set, falling back to 1 default profile: "default"

```
### <mark> 2023-01-11T21:05:38.770-03:00  WARN 6824 --- [           main] ConfigServletWebServerApplicationContext : Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.BeanDefinitionStoreException: Failed to parse configuration class [com.portfolio.SpringBoot.Application]</mark>

### <mark>2023-01-11T21:05:38.830-03:00 ERROR 6824 --- [           main] o.s.boot.SpringApplication               : Application run failed</mark>
```bash
org.springframework.beans.factory.BeanDefinitionStoreException: Failed to parse configuration class [com.portfolio.SpringBoot.Application]
        at org.springframework.context.annotation.ConfigurationClassParser.parse(ConfigurationClassParser.java:179) ~[spring-context-6.0.2.jar!/:6.0.2]
        at org.springframework.context.annotation.ConfigurationClassPostProcessor.processConfigBeanDefinitions(ConfigurationClassPostProcessor.java:397) ~[spring-context-6.0.2.jar!/:6.0.2]
        at org.springframework.context.annotation.ConfigurationClassPostProcessor.postProcessBeanDefinitionRegistry(ConfigurationClassPostProcessor.java:283) ~[spring-context-6.0.2.jar!/:6.0.2]
        at org.springframework.context.support.PostProcessorRegistrationDelegate.invokeBeanDefinitionRegistryPostProcessors(PostProcessorRegistrationDelegate.java:344) ~[spring-context-6.0.2.jar!/:6.0.2]
        at org.springframework.context.support.PostProcessorRegistrationDelegate.invokeBeanFactoryPostProcessors(PostProcessorRegistrationDelegate.java:115) ~[spring-context-6.0.2.jar!/:6.0.2]
        at org.springframework.context.support.AbstractApplicationContext.invokeBeanFactoryPostProcessors(AbstractApplicationContext.java:745) ~[spring-context-6.0.2.jar!/:6.0.2]
        at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:565) ~[spring-context-6.0.2.jar!/:6.0.2]
        at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.0.0.jar!/:3.0.0]
        at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:730) ~[spring-boot-3.0.0.jar!/:3.0.0]
        at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:432) ~[spring-boot-3.0.0.jar!/:3.0.0]
        at org.springframework.boot.SpringApplication.run(SpringApplication.java:308) ~[spring-boot-3.0.0.jar!/:3.0.0]
        at org.springframework.boot.SpringApplication.run(SpringApplication.java:1302) ~[spring-boot-3.0.0.jar!/:3.0.0]
        at org.springframework.boot.SpringApplication.run(SpringApplication.java:1291) ~[spring-boot-3.0.0.jar!/:3.0.0]
        at com.portfolio.SpringBoot.Application.main(Application.java:10) ~[classes!/:0.0.1-SNAPSHOT]
        at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(DirectMethodHandleAccessor.java:104) ~[na:na]
        at java.base/java.lang.reflect.Method.invoke(Method.java:578) ~[na:na]
        at org.springframework.boot.loader.MainMethodRunner.run(MainMethodRunner.java:49) ~[SpringBoot-0.0.1-SNAPSHOT.jar:0.0.1-SNAPSHOT]
        at org.springframework.boot.loader.Launcher.launch(Launcher.java:95) ~[SpringBoot-0.0.1-SNAPSHOT.jar:0.0.1-SNAPSHOT]
        at org.springframework.boot.loader.Launcher.launch(Launcher.java:58) ~[SpringBoot-0.0.1-SNAPSHOT.jar:0.0.1-SNAPSHOT]
        at org.springframework.boot.loader.JarLauncher.main(JarLauncher.java:65) ~[SpringBoot-0.0.1-SNAPSHOT.jar:0.0.1-SNAPSHOT]
Caused by: java.io.FileNotFoundException: class path resource [com/portfolio/SpringBoot/controller/ControllerCard.class] cannot be opened because it does not exist
        at org.springframework.core.io.ClassPathResource.getInputStream(ClassPathResource.java:211) ~[spring-core-6.0.2.jar!/:6.0.2]
        at org.springframework.core.type.classreading.SimpleMetadataReader.getClassReader(SimpleMetadataReader.java:54) ~[spring-core-6.0.2.jar!/:6.0.2]
        at org.springframework.core.type.classreading.SimpleMetadataReader.<init>(SimpleMetadataReader.java:48) ~[spring-core-6.0.2.jar!/:6.0.2]
        at org.springframework.core.type.classreading.SimpleMetadataReaderFactory.getMetadataReader(SimpleMetadataReaderFactory.java:103) ~[spring-core-6.0.2.jar!/:6.0.2]
        at org.springframework.boot.type.classreading.ConcurrentReferenceCachingMetadataReaderFactory.createMetadataReader(ConcurrentReferenceCachingMetadataReaderFactory.java:86) ~[spring-boot-3.0.0.jar!/:3.0.0]
        at org.springframework.boot.type.classreading.ConcurrentReferenceCachingMetadataReaderFactory.getMetadataReader(ConcurrentReferenceCachingMetadataReaderFactory.java:73) ~[spring-boot-3.0.0.jar!/:3.0.0]
        at org.springframework.core.type.classreading.SimpleMetadataReaderFactory.getMetadataReader(SimpleMetadataReaderFactory.java:81) ~[spring-core-6.0.2.jar!/:6.0.2]
        at org.springframework.context.annotation.ConfigurationClassParser.parse(ConfigurationClassParser.java:188) ~[spring-context-6.0.2.jar!/:6.0.2]
        at org.springframework.context.annotation.ConfigurationClassParser.doProcessConfigurationClass(ConfigurationClassParser.java:298) ~[spring-context-6.0.2.jar!/:6.0.2]
        at org.springframework.context.annotation.ConfigurationClassParser.processConfigurationClass(ConfigurationClassParser.java:244) ~[spring-context-6.0.2.jar!/:6.0.2]
        at org.springframework.context.annotation.ConfigurationClassParser.parse(ConfigurationClassParser.java:197) ~[spring-context-6.0.2.jar!/:6.0.2]
        at org.springframework.context.annotation.ConfigurationClassParser.parse(ConfigurationClassParser.java:165) ~[spring-context-6.0.2.jar!/:6.0.2]
        ... 19 common frames omitted
´´´