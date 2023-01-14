```bash

cd C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot; "JAVA_HOME=C:\\Program Files\\Java\\jdk-19" cmd /c "\"C:\\PortFolioWeb\\Portfolio\\PortfolioBackEnd\\SpringBoot\\mvnw.cmd\" -Dexec.vmArgs= \"-Dexec.args=${exec.vmArgs} -classpath %classpath ${exec.mainClass} ${exec.appArgs}\" -Dexec.appArgs= -Dexec.mainClass=com.portfolio.SpringBoot.Application \"-Dexec.executable=C:\\Program Files\\Java\\jdk-19\\bin\\java.exe\" -Dexec.workingdir=C:\\PortFolioWeb\\Portfolio\\PortfolioBackEnd\\SpringBoot \"-Dmaven.ext.class.path=C:\\Program Files\\NetBeans-16\\netbeans\\java\\maven-nblib\\netbeans-eventspy.jar\" --errors --errors org.codehaus.mojo:exec-maven-plugin:3.0.0:exec"
Running NetBeans Compile On Save execution. Phase execution is skipped and output directories of dependency projects (with Compile on Save turned on) will be used instead of their jar artifacts.
Error stacktraces are turned on.
Scanning for projects...

----------------------< com.portfolio:SpringBoot >----------------------
Building SpringBoot 0.0.1-SNAPSHOT
--------------------------------[ jar ]---------------------------------

--- exec-maven-plugin:3.0.0:exec (default-cli) @ SpringBoot ---

  .   ____          _            __ _ _
 /\\ / ___"_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | "_ | "_| | "_ \/ _" | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  "  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.0.0)

2023-01-13T09:31:20.423-03:00  INFO 3596 --- [  restartedMain] com.portfolio.SpringBoot.Application     : Starting Application using Java 19.0.1 with PID 3596 (C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot\target\classes started by waldr in C:\PortFolioWeb\Portfolio\PortfolioBackEnd\SpringBoot)
2023-01-13T09:31:20.434-03:00  INFO 3596 --- [  restartedMain] com.portfolio.SpringBoot.Application     : No active profile set, falling back to 1 default profile: "default"
2023-01-13T09:31:20.587-03:00  INFO 3596 --- [  restartedMain] .e.DevToolsPropertyDefaultsPostProcessor : Devtools property defaults active! Set "spring.devtools.add-properties" to "false" to disable
2023-01-13T09:31:20.587-03:00  INFO 3596 --- [  restartedMain] .e.DevToolsPropertyDefaultsPostProcessor : For additional web related logging consider setting the "logging.level.web" property to "DEBUG"
2023-01-13T09:31:22.370-03:00  INFO 3596 --- [  restartedMain] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2023-01-13T09:31:22.661-03:00  INFO 3596 --- [  restartedMain] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 271 ms. Found 15 JPA repository interfaces.
2023-01-13T09:31:24.809-03:00  INFO 3596 --- [  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)
2023-01-13T09:31:24.829-03:00  INFO 3596 --- [  restartedMain] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2023-01-13T09:31:24.829-03:00  INFO 3596 --- [  restartedMain] o.apache.catalina.core.StandardEngine    : Starting Servlet engine: [Apache Tomcat/10.1.1]
2023-01-13T09:31:24.992-03:00  INFO 3596 --- [  restartedMain] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2023-01-13T09:31:24.996-03:00  INFO 3596 --- [  restartedMain] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 4402 ms
Loading class "com.mysql.jdbc.Driver". This is deprecated. The new driver class is "com.mysql.cj.jdbc.Driver". The driver is automatically registered via the SPI and manual loading of the driver class is generally unnecessary.
2023-01-13T09:31:25.131-03:00  INFO 3596 --- [  restartedMain] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2023-01-13T09:31:25.146-03:00  WARN 3596 --- [  restartedMain] c.zaxxer.hikari.util.DriverDataSource    : Registered driver with driverClassName=com.mysql.jdbc.Driver was not found, trying direct instantiation.
2023-01-13T09:31:27.298-03:00  INFO 3596 --- [  restartedMain] com.zaxxer.hikari.pool.HikariPool        : HikariPool-1 - Added connection com.mysql.cj.jdbc.ConnectionImpl@3d99e795
2023-01-13T09:31:27.301-03:00  INFO 3596 --- [  restartedMain] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
2023-01-13T09:31:27.341-03:00  INFO 3596 --- [  restartedMain] o.s.b.a.h2.H2ConsoleAutoConfiguration    : H2 console available at "/h2-console". Database available at "jdbc:mysql://bn7wfwyguzt7600zmpzm-mysql.services.clever-cloud.com:3306/bn7wfwyguzt7600zmpzm?useSSL=false&serverTimezone=UTC"
2023-01-13T09:31:27.845-03:00  INFO 3596 --- [  restartedMain] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing PersistenceUnitInfo [name: default]
2023-01-13T09:31:27.980-03:00  INFO 3596 --- [  restartedMain] org.hibernate.Version                    : HHH000412: Hibernate ORM core version 6.1.5.Final
2023-01-13T09:31:28.476-03:00  WARN 3596 --- [  restartedMain] org.hibernate.orm.deprecation            : HHH90000021: Encountered deprecated setting [javax.persistence.sharedCache.mode], use [jakarta.persistence.sharedCache.mode] instead
2023-01-13T09:31:29.482-03:00  INFO 3596 --- [  restartedMain] SQL dialect                              : HHH000400: Using dialect: org.hibernate.dialect.MySQLDialect
2023-01-13T09:32:47.290-03:00  INFO 3596 --- [  restartedMain] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]
2023-01-13T09:32:47.304-03:00  INFO 3596 --- [  restartedMain] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit "default"
2023-01-13T09:32:49.162-03:00  WARN 3596 --- [  restartedMain] JpaBaseConfiguration$JpaWebConfiguration : spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning
###### WebConfig class ######
Fri Jan 13 09:32:49 ART 2023
2023-01-13T09:32:50.105-03:00  INFO 3596 --- [  restartedMain] o.s.b.d.a.OptionalLiveReloadServer       : LiveReload server is running on port 35729
2023-01-13T09:32:50.264-03:00  INFO 3596 --- [  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ""
2023-01-13T09:32:50.286-03:00  INFO 3596 --- [  restartedMain] com.portfolio.SpringBoot.Application     : Started Application in 91.001 seconds (process running for 92.29)
```