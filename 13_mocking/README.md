# 13_mocking
Desarrollo del desafío de mocking y manejo de errores
# Consideraciones
0. La colección de Postman para revisar este entregable está en `cd .\CoderhouseBackend_Mocking.postman_collection.json`
1. En esta ruta se pueden ver los productos tipo Mock http://localhost:8080/mockingproducts 
2. Se ha generado un control de errores personalizable y específico para la creación de un producto, cuando este no tiene los campos requeridos. Se implementó el control de errores a nivel de controlador.

# Iniciar
0. En línea de comandos `cd .\12_tercera_entrega\`
1. `npm install`
2. `npm start`
3. Para probar los endpoints utilizar la colección de postman
4. Para probar las vistas:
* Productos: http://localhost:8080/products 
* Página con error: http://localhost:8080/products?page=-100
* Carrito: http://localhost:8080/carts/646b919fc9fc74f4ddcfd112

