# <span style="color:Antiquewhite">Proyecto Integrador Portfolio Web Full Stack ED3
<hr>


## <span style="color:Aquamarine">Diseño:
El proyecto tiene arquitectura distribuida y ésta es la interfaz de usuario (front end) la cual muestra los datos.

Utiliza las APIs necesarias para obtener los datos por medio de una aplicacion back end (alojada en un SERVIDOR WEB), la cual se nutre de una base de datos desplegada en otro servicio web, en un DB SERVER.

Hosting y sus caracteristicas:
DATABASE mySQL -Plans DEV (free): 
- vCPUs: Shared
- RAM: Shared
- Disk size: 10 MiB
- Connection limit: 5

BACKEND java . Docker -Free Web Services:
- El servicio es suspendido tras 15 minutos de inactividad, esto causa un delay importante tras el primer pedido HTTP si habia transcurrido dicho plazo de falta de uso.

<span style="color:yellow"><i> *** Aclarado lo anterior, un acceso a la aplicacion del portfolio, si se encuentra en estado de reposo/hibernacin, puede demorar más de 5 minutos, mientras se despiertan los HOSTING's dormidos ;) jaaaa jaa.<i></span>



## <span style="color:Aquamarine"> Caracteristicas e implementaciones:
- Front End dinámico, SPA.
- Securitizado con la implementacion JWT en Spring Boot (backend) y Angular (frontend).
- Acceso con username y password (Ingresando como administrador, permite 
editar, agregar y eliminar datos de la DB).
- Componentes, servicios, proveedores y directivas implementadas.
- Diseño responsivo utilizando framework bootstrap.
- Captura de excepciones básico y elemental.
- Refuerzo de la politica de integridad de datos con "Validación en formularios", tanto en el html como en el código typescript.

## <span style="color:Aquamarine"> Cosas con las que no quedé conforme:
- La estructura del proyecto es muy desprolija y no sólo no permite su reutilización de manera simple para otros proyectos, tampoco resulta fácil seguir la lógica del flujo del sistema.
- Existe bloques de código (tanto en typescript, html y css) que se encuentra repetido en diferentes componentes, es decir no se ha reutilizado.
- Existen bloques de código y también componentes que aún están en prueba para futuras implementaciones o incluso pruebas ya descartadas. Se debió haber creado ramificaciones o stash en el repo de GitHub en vez de dejarlos sueltos ensuciando el codigo del proyecto.
- No encontré forma de validar que los atributos de los formularios hayan cambiado su valor original, quería que el uso de llamadas http POST se realizaran sólo si esto sucedía, con la misma lógica que un form.valid. Terminé resolviendolo medio artesanalmente. Debo seguir investigando la mejor forma de implementar esto.

## Pendientes o próximas actualizaciones:
- Validacion con expresion regular en los inputs de las url.
- Crear un método para alimentar un select-option con los diferentes iconos disponibles para las redes sociales, actualmente se carga el nombre de la red como un string para que se renderize su icono, si no existe en @fontawesome sólo muestra el label.
- ROUTER y GUARDS.
- Reorganizar la estructura del proyecto para futuras reutilizaciones. Crear modulos por entidad/modelo para concentrar en él sus elementos ( componentes, directivas, servicios, html, etc)
- Refactorización de código, limpiar código de pruebas, limpiar importaciones/variables/métodos no utilizados.
- Utilizar APIs implementadas en el backend para customizar la maquetación (layoud) tanto en la visualizacion/ocultamiento de algunos elementos/datos como así también la funcionalidad de un ordenamiento via Drag and Drop.

## <span style="color:Aquamarine"> Bugs conocidos y no resueltos:
- No tiene un buen diseño ni comportamiento los componentes contacto y login del top-nav.
- El contenedor de Hardskill y Softskill no tiene el mismo diseño que el resto de los contenedores de caracteristicas similares.
- Por error en el css por el cambio a ultimo momento, el cuadro de dialogo de las ventanas modales de informacion adicional (por ejemplo en las empresas/organizaciones), no se visualiza el boton de cierre.

<br></br>
###  <span style="color:Antiquewhite"><em>Gracias por leer todo esto, y espero no te duelan los ojos al ver el código.
<span style="color:Antiquewhite"><b>WR<b><em>