# Tercera entrega - Checklist
#### El proyecto se encuentra separado por capas:
* **Modificar nuestra capa de persistencia para aplicar los conceptos de Factory (opcional), DAO y DTO.**
Realizado.

#### El proyecto cuenta con DAO de archivos y DAO de MongoDB:
* **Implementar el patrón Repository para trabajar con el DAO en la lógica de negocio.** 
Se incluyen los conceptos mencionados.

* **El DAO seleccionado (por un parámetro en línea de comandos como lo hicimos anteriormente) será devuelto por una Factory para que la capa de negocio opere con él. (Factory puede ser opcional)**
Seleccionamos el DAO a través de una variable de entorno PERSISTENCE.

* **Modificar la ruta  /current Para evitar enviar información sensible, enviar un DTO del usuario sólo con la información necesaria.**
La ruta modificada es http://localhost:8080/api/session/current, el DTO se utilizó a través de users.service.js en sessions.routes.js.

#### Los endpoints se encuentran protegidos por roles:
* **Realizar un middleware que pueda trabajar en conjunto con la estrategia “current” para hacer un sistema de autorización y delimitar el acceso a dichos endpoints.**
En /middlewares/auth.js se puede encontrar el desarrollo del middleware que se utiliza en los routers tanto de "products" y "carts". En el caso del servidor de Chat, se implemento en "app.js". En el caso de carts, por motivos de pruebas se comentó la sección de añadir un produycto al carrito, para no tener problemas en las pruebas con Postman.

#### El carrito sólo compra los productos en stock. El ticket se genera con los datos de compra.*
* **Crear un modelo Ticket el cual contará con todas las formalizaciones de la compra.**
Creado.
* **Implementar, en el router de carts, la ruta /:cid/purchase, la cual permitirá finalizar el proceso de compra de dicho carrito.**
Se crearon pruebas en la colección de Postman para esta validación, véase **test3**

#### Envía SMS, envía correos:
El sistema envía correos al momento de registrarse un usuario. El sistema envía un sms, al momento de realizar una compra.

# Consideraciones
0. Se ha modificado la estructura de las carpetas y archivos en base al modelo de capas y se han colocado las variables de entorno de manera adecuada.
1. La base de datos se llama **ecommerce**
2. Se han considerado las pruebas solicitadas en un archivo **CoderhouseBackend_Tercera_Entrega_lburbano.postman_collection** adjunto con una colección de Postman.
3. La url base es: http://localhost:8080/
4. Se utiliza nodemon para levantar el servidor.

# Iniciar
0. En línea de comandos `cd .\12_tercera_entrega\`
1. `npm install`
2. `npm start`
3. Para probar los endpoints utilizar la colección de postman
4. Para probar las vistas:
* Productos: http://localhost:8080/products 
* Página con error: http://localhost:8080/products?page=-100
* Carrito: http://localhost:8080/carts/646b919fc9fc74f4ddcfd112

# Importante
- Se ha colocado los ids de los carritos en el detalle por producto para añadir el producto a un carrito determinado. En el desafío esto queda abierto, pero ya que no se solicita crear un carrito atado a la sesión del usuario, se ha tomado esta medida.
- Puedo añadir un producto a cualquier carrito disponible.
