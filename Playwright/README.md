# Requisitos
* debe tener instalado Ghost localmente en su máquina
* node v14.15.5

## despliegue

- cd ghost
- ghost install local
- (si no se inicia de una) ghost start
- cd ..
- cd test-playwright
- npm install
- en el archivo ./test-playwright/index.js se deben ingresar los datos de userName, userEmail, userPassword y el port y url en caso que haya cambiado
- estando en la carpeta de test-playwright, ejecutamos node ./index.js
- Esperamos a que se ejecute
- En la terminal se puede ir viendo la iformación de los escenarios de forma de forma similar a gherkin
- Igualmente, en la la carpeta screenshots quedan las evidencias de la ejecución.
