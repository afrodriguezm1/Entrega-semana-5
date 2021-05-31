# Entrega de la semana 8

## Integrantes

- Nixon Fernando ortiz Suarez
  - 30 escenarios de Nixon para la entrega de la semana 7 [aquí](https://github.com/afrodriguezm1/Entrega-semana-5/wiki/Escenarios-Nixon-Ortiz)
- Andrés Felipe Rodriguez Murillo

## Documentación

- Estrategia de pruebas [doc](https://drive.google.com/file/d/165mUDBGobWV97EYi0QXjtNML-VdpZU1u/view?usp=sharing)
- Inventario de pruebas manuales [docs](https://drive.google.com/file/d/19j10nQYz0-uu4bw7Jhphu-4cd_GvfgW4/view?usp=sharing)


## Pre requisitos

Tener instalado:

1. Ghost
2. node y npm
3. Si ya se ha creado una cuenta de administración de ghost antes
   - ir al directorio `/content/data`
   - borrar el archivo `ghost-dev.db` o `ghost-local.db` dependiendo de la versión de ghost

## Como ejecutar las pruebas

1. Ingresar a la subcarpeta Playwright/
2. Dentro del archivo config.json
   - el atributo `url` define en que url esta corriendo ghost
   - el atributo `screenshotFolder` en donde se guardaran los screenshots
3. Ejecutar `npm i ` para instalar todas las dependencias
4. Generar los datos a priori con el comando `npm run generate:apriori`, o usar los datos generados anteriormente dentro de la carpeta `tests/mocks/user.json`.
5. En la carpeta Ghost, ejecute `ghost install 3.42.5 local` para desplegar el servicio del cliente
6. Ejecutar el comando `npm run test:admin` para ejecutar las pruebas de crear cuenta administrador
7. Ejecutar el comando `npm run test` para ejecutar las pruebas, las pruebas de administrador van a ser ignoradas.
8. Ejecutar el comando `node reporteGenrator.js` para generar el reporte visual

## Escenarios de pruebas ejecutados

| Identificador de la prueba | Autor/Tester     | Funcionalidad     | Requerimiento(Func., No func.) | Tipo de escenario (Positivo, Negativo, Mix) | Nombre del escenario                                                                                   | Errores encontrados (Id de las incidencias) |
| -------------------------- | ---------------- | ----------------- | ------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| 001                        | Nixon Ortiz      | Iniciar Sesión    | Funcional                      | Positivo                                    | Inicio de sesión exitoso                                                                               | Ninguno                                     |
| 002                        | Nixon Ortiz      | Iniciar Sesión    | Funcional                      | Negativo                                    | Inicio de sesión con datos invalidos                                                                   | Ninguno                                     |
| 003                        | Nixon Ortiz      | Crear Publicación | Funcional                      | Postivo                                     | La publicación se crea vacia                                                                           | Ninguno                                     |
| 004                        | Nixon Ortiz      | Crear Publicación | Funcional                      | Postivo                                     | La publicación se crea con titulo y un parrafo                                                         | Ninguno                                     |
| 005                        | Nixon Ortiz      | Crear Publicación | Funcional                      | Postivo                                     | La publicación se crea con titulo de mas de 100 caracteres                                             | Ninguno                                     |
| 006                        | Andrés Rodriguez | Crear ghost       | Funcional                      | Negativa                                    | No se crea ni el usuario ni el ghost con datos inválidos                                               | Ninguno                                     |
| 007                        | Andrés Rodriguez | Crear ghost       | Funcional                      | Positiva                                    | Se crea el usuario y el ghost con datos correctos y completos                                          | Ninguno                                     |
| 008                        | Andrés Rodriguez | Añadir miembros   | Funcional                      | Negativa                                    | El miembro no es agregado cuando se le dan datos inválidos                                             | Ninguno                                     |
| 009                        | Andrés Rodriguez | Añadir miembros   | Funcional                      | Negativa                                    | El miembro no es agregado si el tamaño de la nota es mayor a 500 caracteres                            | Ninguno                                     |
| 010                        | Andrés Rodriguez | Añadir miembros   | Funcional                      | Negativa                                    | El miembro no es agregado si ya existe un miembreo con ese usuario                                     | Ninguno                                     |
| 011                        | Andrés Rodriguez | Añadir miembros   | Funcional                      | Positiva                                    | El miembro es agregado exitosamente con toda la información                                            | Ninguno                                     |
| 012                        | Andrés Rodriguez | Añadir Tags       | Funcional                      | Negativa                                    | La tag no es agregada si los datos suministrados no son completos                                      | Ninguno                                     |
| 013                        | Andrés Rodriguez | Añadir Tags       | Funcional                      | Negativa                                    | La tag no es agregada si el color de la tag no es formato hexadecimal                                  | Ninguno                                     |
| 014                        | Andrés Rodriguez | Añadir Tags       | Funcional                      | Negativa                                    | La tag no es agregada si la descripción supera los 500 caracteres                                      | Ninguno                                     |
| 015                        | Andrés Rodriguez | Añadir Tags       | Funcional                      | Positiva                                    | La tag es agregada si todos los datos son brindados                                                    | Ninguno                                     |
| 016                        | Andrés Rodriguez | Añadir Staff      | Funcional                      | Negativa                                    | No se invita a nadie si el campo del correo no está completo                                           | Ninguno                                     |
| 017                        | Andrés Rodriguez | Añadir Staff      | Funcional                      | Negativa                                    | No se invita si el correo ya hace parte del equipo de staff                                            | Ninguno                                     |
| 018                        | Andrés Rodriguez | Añadir Staff      | Funcional                      | Positiva                                    | Se invita si el correo no hace parte del equipo de staff y no está vacio                               | Ninguno                                     |
| 019                        | Andrés Rodriguez | Añadir Staff      | No funcional                   | Positiva                                    | Se instalan nuevos themas para el ghost desde la configuración y haciendo click en el tema deseado     | Ninguno                                     |
| 020                        | Andrés Rodriguez | Añadir Staff      | No funcional                   | Positiva                                    | Se activan los themas descargado al ingresar al panel de control de los themas y seleccionando activar | Ninguno                                     |  
