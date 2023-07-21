# 14_logging
Desarrollo del desafío de logging
# Consideraciones
0. La ruta utilizada para validar el loggin es localhost:8080/loggerTest
1. Para cambiar de ambiente utilizar .env
2. Utilizar npm install nuevamente para instalar winston
3. Se modificaron todos los console.log por req.logger.debug
4. En el controlador de products se colocó logging en todas las respuestas erróneas.

# Iniciar
0. En línea de comandos `cd .\12_tercera_entrega\`
1. `npm install`
2. `npm start`
3. Para probar los endpoints utilizar la colección de postman
4. Para probar las vistas:
* Productos: http://localhost:8080/products 
* Página con error: http://localhost:8080/products?page=-100
* Carrito: http://localhost:8080/carts/646b919fc9fc74f4ddcfd112

