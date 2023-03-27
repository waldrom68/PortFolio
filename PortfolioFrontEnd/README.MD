# Proyecto Integrador Portfolio Web Full Stack ED3

## Diseño:
El proyecto tiene arquitectura distribuida y ésta es la interfaz de usuario (front end) la cual muestra los datos.

Utiliza las APIs necesarias para obtener los datos por medio de una aplicacion back end (alojada en un SERVIDOR WEB), la cual se nutre de una base de datos desplegada en otro servicio web, en un DB SERVER.

## Caracteristicas e implementaciones:
- Front End dinámico, SPA.
- Securitizado con la implementacion JWT en Spring Boot (backend) y Angular (frontend).
- Acceso con username y password (Ingresando como administrador, permite 
editar, agregar y eliminar datos de la DB).
- Componentes, servicios, proveedores y directivas implementadas.
- Diseño responsivo utilizando framework bootstrap.
- Captura de excepciones básico y elemental.
- Refuerzo de la politica de integridad de datos con una "Validación básica de formularios" a la ya existente en el backend

## Cosas con las que no quedé conforme:
- La estructura del proyecto es muy desprolija y no sólo no permite su reutilización de manera simple para otros proyectos, tampoco resulta fácil seguir la lógica del flujo del sistema.
- Existe bloques de código (tanto en typescript, html y css) que se encuentra repetido en diferentes componentes, es decir no se ha reutilizado.
- Existen bloques de código y también componentes que aún están en prueba para futuras implementaciones o incluso pruebas ya descartadas. Se debió haber creado ramificaciones o stash en el repo de GitHub en vez de dejarlos sueltos ensuciando el codigo del proyecto.

## Pendientes o próximas actualizaciones:
- Validacion en el ingreso de las fechas en los formularios (es decir, como mínimo un desde debe ser menor a su hasta). Y validacion con expresion regular en los ingresos de las url.
- Crear un método para alimentar un select-option con los diferentes iconos disponibles para las redes sociales, actualmente se carga el nombre de la red como un string para que se renderize su icono, si no existe en @fontawesome sólo muestra el label.
- ROUTER y GUARDS.
- Reorganizar la estructura del proyecto para futuras reutilizaciones. Crear modulos por entidad/modelo para concentrar en él sus elementos ( componentes, directivas, servicios, html, etc)
- Refactorización de código, limpiar código de pruebas, limpiar importaciones/variables/métodos no utilizados.
- Utilizar APIs implementadas en el backend para customizar la maquetación (layoud) tanto en la visualizacion/ocultamiento de algunos elementos/datos como así también la funcionalidad de un ordenamiento via Drag and Drop.

## Bugs conocidos y no resueltos:
- No todos métodos que procesan la información de los formularios validan si realmente hubo cambios en las instancias de los objetos, con lo cual pueden existir pedidos http sin sentido.
- No tiene un buen diseño ni comportamiento los componentes contacto y login del top-nav.
- El contenedor de Hardskill y Softskill no tiene el mismo diseño que el resto de los contenedores de caracteristicas similares.

<br></br>
### <em>Gracias por leer todo esto, y espero no te duelan los ojos al ver el código.
<b>WR<b><em>