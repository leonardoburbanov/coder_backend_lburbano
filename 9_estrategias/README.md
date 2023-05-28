# Consideraciones
1. La base de datos se llama **ecommerce**
2. La url base es: http://localhost:8080/
3. Se utiliza nodemon para levantar el servidor.

# Iniciar
0. En línea de comandos `cd .\7_segunda_entrega\`
1. `npm install`
2. `npm start`
3. Para probar las vistas:
* Login: http://localhost:8080/ 
* El rol admin fue implementado a nivel de código:
Email: adminCoder@coder.com
Passwd: adminCod3r123

Importante: No va a dejar que se registre otro usuario con este correo.

* Adicional: Se implementó la vista http://localhost:8080/users a la que solo tiene acceso admin
* Una vez que pasa el login redirige a products

# Importante
- Se ha colocado los ids de los carritos en el detalle por producto para añadir el producto a un carrito determinado. En el desafío esto queda abierto, pero ya que no se solicita crear un carrito atado a la sesión del usuario, se ha tomado esta medida.
- Puedo añadir un producto a cualquier carrito disponible.
