# 13_mocking
Desarrollo del desafío de mocking y manejo de errores
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
