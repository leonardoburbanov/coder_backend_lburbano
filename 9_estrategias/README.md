# Consideraciones
1. La base de datos se llama **ecommerce**
2. La url base es: http://localhost:8080/
3. Se utiliza nodemon para levantar el servidor.

# Iniciar
0. En línea de comandos `cd .\9_estrategias\`
1. `npm install`
2. `npm start`
3. Para probar las vistas:
* Login: http://localhost:8080/ 
* El registro implementa hash en la contraseña con bcrypt, se puede observar en la consola del backend el momento del login del usuario registrado.
* El registro y login está habilitado con Github. Cuando se loguea el sistema redirige al usuario al perfil, en el cual podrá encontrar la información de github. Esto solo aplica para los usuarios registrados mediante github. Para los otros usuarios muestra el perfil normal. http://localhost:8080/profile