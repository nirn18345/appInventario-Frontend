
# ** Angular Frontend**

Este proyecto es una aplicación frontend desarrollada en **Angular** para gestionar un sistema de inventario. Permite realizar operaciones como agregar, editar, eliminar productos, visualizar detalles, y gestionar inventarios a través de una interfaz de usuario intuitiva.

## **Requisitos previos**

Antes de ejecutar la aplicación, asegúrate de tener instalados los siguientes requisitos:

- **Node.js** (v16 o superior)
- **Angular CLI** (v17 o superior)
- **npm** (administrador de paquetes de Node.js)

Si aún no tienes Node.js, puedes descargarlo desde [aquí](https://nodejs.org/).

## **Instrucciones para configurar y ejecutar el proyecto**

1. **Clonar el repositorio**


2. **Instalar las dependencias**

   Instala las dependencias del proyecto ejecutando el siguiente comando:

   ```bash
   npm install
   ```

3. **Configurar la API Backend**

   La aplicación se conecta a una API RESTful backend, por lo que debes asegurarte de que el servidor de backend esté en funcionamiento. 

4. **Ejecutar el proyecto**

   Una vez que todas las dependencias estén instaladas y la API backend esté en ejecución, ejecuta la aplicación con el siguiente comando:

   ```bash
   ng serve
   ```

   Esto iniciará el servidor de desarrollo en `http://localhost:4200`. Abre tu navegador y navega a esa URL para ver la aplicación en funcionamiento.



## **Funcionalidades**

- **Lista de Productos**: Muestra todos los productos en inventario,
- **Agregar Producto**: Permite agregar nuevos productos al inventario.
- **Editar Producto**: Permite modificar los detalles de un producto existente.
- **Eliminar Producto**: Permite eliminar productos del inventario.
- **Ver Detalles del Producto**: Muestra detalles completos de un producto seleccionado.

## **Dependencias principales**

- **Angular**: Framework principal para la construcción de la aplicación.
- **Angular Material**: Biblioteca de componentes UI para una mejor experiencia de usuario.
- **RxJS**: Biblioteca para programación reactiva, utilizada para manejar observables y flujos de datos.
- **NgRx** (si se implementa): Biblioteca para el manejo del estado global de la aplicación.


## **Buenas prácticas**

Este proyecto sigue las mejores prácticas de desarrollo en Angular, como:

- Uso de componentes reutilizables.
- Inyección de dependencias a través de servicios.
- Manejo de estado mediante servicios y patrones como el de "Observer".
- Uso de rutas para una navegación fluida.
- Implementación de formularios reactivos para la validación de datos.


