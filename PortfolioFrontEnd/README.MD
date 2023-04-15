# <span style="color:Antiquewhite; font-size: 1.5em">Proyecto Integrador Portfolio Web Full Stack ED3

# <span style="color:Aquamarine">Diseño
<div style= "font-size: 1.5em"> El proyecto tiene arquitectura distribuida y ésta es la interfaz de usuario (front end) la cual muestra los datos.

Utiliza las APIs necesarias para obtener los datos por medio de una aplicacion back end alojada en un SERVIDOR WEB, la cual se nutre de una base de datos desplegada en otro servicio web, en un DB SERVER.

Hosting y sus caracteristicas:
DATABASE mySQL -Plans DEV (free): 
- vCPUs: Shared
- RAM: Shared
- Disk size: 10 MiB
- Connection limit: 5

BACKEND java . Docker -Free Web Services:
- El servicio es suspendido tras 15 minutos de inactividad, esto causa un delay importante tras el primer pedido HTTP si habia transcurrido dicho plazo de falta de uso.
</div>

<span style="color:yellow"><i> *** Aclarado lo anterior, si la aplicacion se encuentra en estado de reposo/hibernacin, la obtención de los datos del portfolio,  puede demorar más de 5 minutos, mientras se despiertan los HOSTING's dormidos ;) jaaaa jaa.<i></span>
<hr>


## <span style="color:Aquamarine"> Caracteristicas e implementaciones
- Front End dinámico, SPA.

- Dado la lógica de un sistema que no espera que dos usuarios ADMINISTRADORES trabajen en forma concurrente sobre un mismo portfolio, se realiza la menor cantidad de llamadas HTTP (ver reglas de negocio llamadas HTTP).

- Usabilidad semejante a la de una app, es decir sin utilizar el "avanzar/retroceder página" en los navegadores.

- Securitizado con la implementacion JWT para modo ADMIN, controlando PERFIL y tiempo para la expiración pasados los 60 minutos del logueo, ya sea con o sin actividad.

- Acceso con username y password (Ingresando como administrador, permite editar, agregar y eliminar datos de la DB).

- Componentes, servicios, proveedores y directivas implementadas.

- Diseño responsivo utilizando framework bootstrap.

- Captura de la mayoría de las excepciones con mensajes entendible para el usuario final.

- Refuerzo de la politica de integridad de datos con validaciones en todos los formularios, tanto en el html como en el código typescript.
<hr>

## <span style="color:Aquamarine"> Reglas de negocio para llamadas HTTP
- Durante la carga del sistema se realiza un único pedido al backend para obtener las configuraciones del layout (Card) y todos los datos de la persona del PortFolio (FullPerson).

- En modo ADMIN, cada cambio en los valores de los atributos (alta, baja y modificacion) se relizan los pedidos HTTP PUT, POST o DELETE  en 2do plano. Sólo si no hay error en dichos procesos, se realiza una actualizacion de la informacion general obtenida en el primer paso, con esto no se realiza otro pedido GET al backend (se mantiene la informacion como un espejo de los datos en enviados para su persistencia)
<hr>

## <span style="color:Aquamarine"> Cosas con las que no quedé conforme
- La estructura del proyecto quedó muy desprolija y no sólo no permite su reutilización de manera simple para otros proyectos, tampoco resulta fácil seguir la lógica del flujo del sistema.

- Existe bloques de código (tanto en typescript, html y css) repetidos en diferentes componentes, es decir no se han reutilizado.

- Existen bloques de código y también componentes que aún están en prueba para futuras implementaciones o incluso pruebas ya descartadas. Se debió haber creado ramificaciones o stash con GIT en vez de dejarlos sueltos ensuciando el codigo del proyecto.

- Se debe de seguir trabajando sobre el layout, hay bastante para mejorar la UI.
<hr>

## <span style="color:Aquamarine"> Pendientes o próximas actualizaciones
- Implementar la entidad del backend ProjectMedia para que el componente proyectos, además de la descripcion y su link, permita visualizar imagenes/videos. Esto tiene la complejidad de para el manejo de eliminacion/modificacion en el storage de firebase.

- Validacion con expresion regular en los inputs de las url.

- Encontrar una forma simple de realizar validacion de cambios (efectivos) en los formularios. Actualmente existen reglas de negocio casi artesanales/primitivas para dicha validación. El objetivo de esto es que si no hay cambios en los datos, se comporte de forma similar a un form.invalid, es decir que exista una llamada http POST si realmente existe la necesidad de enviar al backend algo para su persistencia.

- En las redes sociales para que se renderice su isologotipo, en el ABM se debe cargar el nombre de referencia tal cual existe en @fontawesome. Ideal sería ver como precargar un select-option con las redes/marcas existentes en dicha librería para hacer mas amigable el uso en modo ADMIN.

- ROUTER y GUARDS.

- Reorganizar la estructura del proyecto para futuras reutilizaciones. Crear modulos por entidad/modelo para concentrar en él sus elementos (componentes, directivas, servicios, html, etc)

- Refactorización de código, limpiar códigos de pruebas, limpiar importaciones, variables y métodos que terminaron no siendo utilizados dentro de las clases/componentes.

- Utilizar APIs implementadas en el backend para customizar aún más la maquetación (layoud) tanto en la visualizacion/ocultamiento de algunos elementos/datos como así también la funcionalidad de un ordenamiento via Drag and Drop.

- Implementar progress bar o algún otro efecto visual para que el usuario ADMIN note que SU PEDIDO está siendo ejecutado en 2do plano y puede demorar hasta 5 minutos  (recordar que si los servidores del backend o de la DB se encontraban en modo hibernación un pedido http suele tardar mucho por los planes free).

- Securitizar el acceso a los archivos del storage de firebase.
<hr>

## <span style="color:Aquamarine"> Bugs conocidos y no resueltos
- No tiene un buen diseño ni comportamiento los componentes contacto y login del top-nav.

- Los contenedores de Hardskill y Softskill no tienen el mismo diseño que el resto de los contenedores de caracteristicas similares.

- Por error en el css por el cambio a ultimo momento, el cuadro de dialogo de las ventanas modales con informacion adicional, no se visualiza el boton de cierre y tiene mal los margenes/alineacion/justificacion (por ejemplo en las empresas/organizaciones).

- No es muy visible que se tiene acceso a link exteriores o informaciones adicionales.
<hr>

<br></br>

##  <div style="color:Antiquewhite">Espero no  duelan los ojos al ver el código, seguramente existen formas mas simples para resolver situaciones. <br> Claramente aún no las descubrí ni las investigué.</div>


<br></br>
<span style="color:Antiquewhite"><b>¡ Gracias por leer todo esto !<br>WALTER (abril 2023)<b><em>