# Requisitos
* debe tener instalado Ghost localmente en su máquina
* node v14.15.5

## despliegue

- cd "ghost v3.3.0"
- ghost install 3.3.0 local
- (si no se inicia de una) ghost start
- Anotamos el puerto en el que se está desplegando el ghost v3.3.0
- cd ..
- cd "ghost v4.4.0"
- ghost install 4.4.0 local
- (si no se inicia de una) ghost start
- Anotamos el puerto en el que se está desplegando el ghost v4.4.0
- cd ..
- cd test-playwright
- npm install
- en el archivo ./test-playwright/index.js se deben ingresar los datos de userName, userEmail, userPassword y el port y url en caso que haya cambiado
- en el archivo ./test-playwright/index.js se deben actualizar las variables urlv3_3 y urlv4_4 con los respectivos puertos de las dos versiones de Ghost
- estando en la carpeta de test-playwright, ejecutamos node ./index.js
- Esperamos a que se ejecute
- En la terminal se puede ir viendo la iformación de los escenarios de forma de forma similar a gherkin
- Igualmente, en la la carpeta result se genera un html con la información de respuesta.
