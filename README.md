# Entrega de la semana 5

## Integrantes
- Nixon Fernando ortiz Suarez
- Andrés Felipe Rodriguez Murillo

## Escenarios de pruebas ejecutados 

| Identificador de la prueba | Autor/Tester | Funcionalidad| Requerimiento(Func., No func.) | Tipo de escenario (Positivo, Negativo, Mix) | Nombre del escenario| Errores encontrados (Id de las incidencias) |
| -----------| ------------ | ----------------- | ------------------------------ | ------------------| -------------------| ---------------------------------|
| 001   | Nixon Ortiz  | Iniciar Sesión    | Funcional      | Positivo    | Inicio de sesión exitoso                      | Ninguno  |
| 002   | Nixon Ortiz  | Iniciar Sesión    | Funcional      | Negativo    | Inicio de sesión con datos invalidos          | Ninguno  |
| 003   | Nixon Ortiz  | Crear Publicación | Funcional      | Postivo     | La publicación se crea vacia                  | Ninguno  |
| 004   | Nixon Ortiz  | Crear Publicación | Funcional      | Postivo     | La publicación se crea con titulo y un parrafo| Ninguno  |
| 005   | Nixon Ortiz  | Crear Publicación | Funcional      | Postivo     | La publicación se crea con titulo de mas de 100 caracteres | Ninguno |
| 006   | Andrés Rodriguez  | Crear ghost  | Funcional      | Negativa     | No se crea ni el usuario ni el ghost con datos inválidos | Ninguno |
| 007   | Andrés Rodriguez  | Crear ghost  | Funcional      | Positiva     | Se crea el usuario y el ghost con datos correctos y completos | Ninguno |
| 008   | Andrés Rodriguez  | Añadir miembros| Funcional      | Negativa     | El miembro no es agregado cuando se le dan datos inválidos | Ninguno |
| 009   | Andrés Rodriguez  | Añadir miembros| Funcional      | Negativa     | El miembro no es agregado si el tamaño de la nota es mayor a 500 caracteres | Ninguno |
| 010   | Andrés Rodriguez  | Añadir miembros| Funcional      | Negativa     | El miembro no es agregado si ya existe un miembreo con ese usuario | Ninguno |
| 011   | Andrés Rodriguez  | Añadir miembros| Funcional      | Positiva     | El miembro es agregado exitosamente con toda la información | Ninguno |
| 012   | Andrés Rodriguez  | Añadir Tags| Funcional      | Negativa     | La tag no es agregada si los datos suministrados no son completos | Ninguno |
| 013   | Andrés Rodriguez  | Añadir Tags| Funcional      | Negativa     | La tag no es agregada si el color de la tag no es formato hexadecimal | Ninguno |
| 014   | Andrés Rodriguez  | Añadir Tags| Funcional      | Negativa     | La tag no es agregada si la descripción supera los 500 caracteres | Ninguno |
| 015   | Andrés Rodriguez  | Añadir Tags| Funcional      | Positiva     | La tag es agregada si todos los datos son brindados | Ninguno |
| 016   | Andrés Rodriguez  | Añadir Staff| Funcional      | Negativa     | No se invita a nadie si el campo del correo no está completo | Ninguno |
| 017   | Andrés Rodriguez  | Añadir Staff| Funcional      | Negativa     | No se invita si el correo ya hace parte del equipo de staff | Ninguno |
| 018   | Andrés Rodriguez  | Añadir Staff| Funcional      | Positiva     | Se invita si el correo no hace parte del equipo de staff y no está vacio | Ninguno |
| 019   | Andrés Rodriguez  | Añadir Staff| No funcional      | Positiva     | Se instalan nuevos themas para el ghost desde la configuración y haciendo click en el tema deseado | Ninguno |
| 020   | Andrés Rodriguez  | Añadir Staff| No funcional      | Positiva     | Se activan los themas descargado al ingresar al panel de control de los themas y seleccionando activar | Ninguno |
