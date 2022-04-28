[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-ccolivares/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-ccolivares?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-ccolivares&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-ccolivares)

[INFORME EN GITHUB PAGES](https://ull-esit-inf-dsi-2122.github.io/ull-esit-inf-dsi-21-22-prct10-async-fs-process-ccolivares/)

# Práctica 10. Sistema de ficheros y creación de procesos en Node.js

## Introducción

## Desarrollo de los ejercicios

### Ejercicio 1

Este ejercicio consiste en analizar un código de Typescript que hace uso del módulo `fs` de `Node.js`. Se nos pide hacer una traza con el estado en cada momento de la pila de llamadas, el registro de eventos de la API, la cola de manejadores y la salida por consola. El código analizado será el siguiente:

```typescript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```

Procedemos como se nos pide a analizar la traza del programa: 

- Instante 0: Inicialización

| **PILA DE LLAMADAS** 	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	| **SALIDA POR CONSOLA** 	|

|:--------------------:	|:-----------------------:	|:-----------------------:	|:----------------------:	|
|           -          	|            -            	|            -            	|            -           	|
<br>

- Instante 1: se introduce el proceso `access` y su callback en la pila de llamadas

| **PILA DE LLAMADAS** 	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	| **SALIDA POR CONSOLA** 	|
|:--------------------:	|:-----------------------:	|:-----------------------:	|:----------------------:	|
|        ACCESS        	|            -            	|            -            	|            -           	|
|   ACCESS (CALLBACK)  	|            -            	|            -            	|            -           	|
<br>

- Instante 2: `access` sale de la pila de llamada y su callback pasa al registro de eventos.

| **PILA DE LLAMADAS** 	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	| **SALIDA POR CONSOLA** 	|
|:--------------------:	|:-----------------------:	|:-----------------------:	|:----------------------:	|
|           -          	|    ACCESS (CALLBACK)    	|            -            	|            -           	|
<br>

- Instante 3: el callback de `access` pasa a la cola de manejadores.

| **PILA DE LLAMADAS** 	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	| **SALIDA POR CONSOLA** 	|
|:--------------------:	|:-----------------------:	|:-----------------------:	|:----------------------:	|
|           -          	|            -            	|    ACCESS (CALLBACK)    	|            -           	|
<br>

- Instante 4: el callback de `access` pasa a la pila de llamadas y comienza a ejecutarse.

|     **PILA DE LLAMADAS**     	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	| **SALIDA POR CONSOLA** 	|
|:----------------------------:	|:-----------------------:	|:-----------------------:	|:----------------------:	|
| EJECUTANDO ACCESS (CALLBACK) 	|            -            	|            -            	|            -           	|
<br>

- Instante 5: al empezar a ejecutarse si no hay ningun fallo se ejecutará la instruccion  ``console.log(`Starting to watch file ${filename}`)``.

|               **PILA DE LLAMADAS**               	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	| **SALIDA POR CONSOLA** 	|
|:------------------------------------------------:	|:-----------------------:	|:-----------------------:	|:----------------------:	|
| ``console.log(`Starting to watch ${filename}`)`` 	|            -            	|            -            	|            -           	|
<br>

- Instante 6: se ejecuta la instrucción que mencionamos, sale de la pila de llamadas y en la salida por consola se muestra el mensaje correspondiente .

|     **PILA DE LLAMADAS**     	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	|      **SALIDA POR CONSOLA**      	|
|:----------------------------:	|:-----------------------:	|:-----------------------:	|:--------------------------------:	|
|              -                |            -            	|            -            	| Starting to watch helloworld.txt 	|
<br>

- Instante 7: la siguiente instrucción que vemos es la función `watch()` que observa los cambios en el fichero que le pasemos por parámetro. Se incluye en la pila de llamadas.

|     **PILA DE LLAMADAS**     	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	| **SALIDA POR CONSOLA** 	|
|:----------------------------:	|:-----------------------:	|:-----------------------:	|:----------------------:	|
|           `watch()`          	|            -            	|            -            	|            -           	|
<br>

- Instante 8: la función `watch()` se ejecuta y sale de la pila de llamadas

| **PILA DE LLAMADAS** 	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	| **SALIDA POR CONSOLA** 	|
|:--------------------:	|:-----------------------:	|:-----------------------:	|:----------------------:	|
|           -          	|            -            	|            -            	|            -           	|
<br>

- Instante 9: la siguiente instrucción que encontramos es `watcher.on('change')` por lo tanto se inserta en la pila de llamadas.

|     **PILA DE LLAMADAS**     	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	| **SALIDA POR CONSOLA** 	|
|:----------------------------:	|:-----------------------:	|:-----------------------:	|:----------------------:	|
|    `watcher.on('change')`    	|            -            	|            -            	|            -           	|
<br>

- Instante 10: este callback pasa al registro de eventos, esperando que haya un evento `change` se quedará en el registro de eventos.

|     **PILA DE LLAMADAS**     	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	| **SALIDA POR CONSOLA** 	|
|:----------------------------:	|:-----------------------:	|:-----------------------:	|:----------------------:	|
|              -                |  `watcher.on('change')` 	|            -            	|            -           	|
<br>

- Instante 11: la siguiente instrucción que encontramos es ``console.log(`File ${filename} is no longer watched`)`` que se añade a la pila de llamadas.

|                   **PILA DE LLAMADAS**                   	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	| **SALIDA POR CONSOLA** 	|
|:--------------------------------------------------------:	|:-----------------------:	|:-----------------------:	|:----------------------:	|
| ``console.log(`File ${filename} is no longer watched`)`` 	|  `watcher.on('change')` 	|            -            	|            -           	|
<br>

- Instante 12: la instrucción mencionada en el paso anterior se ejecuta y se muestra en la salida.

|     **PILA DE LLAMADAS**     	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	|          **SALIDA POR CONSOLA**          	|
|:----------------------------:	|:-----------------------:	|:-----------------------:	|:----------------------------------------:	|
|              -                |  `watcher.on('change')` 	|            -            	| File helloworld.txt is no longer watched 	|
<br>

- Instante 13: si modificasemos el archivo la instrucción `watcher.on('change')` pasaría a la cola de manejadores.

|     **PILA DE LLAMADAS**     	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	| **SALIDA POR CONSOLA** 	|
|:----------------------------:	|:-----------------------:	|:-----------------------:	|:----------------------:	|
|              -                |                         	|  `watcher.on('change')` 	|            -           	|
<br>

- Instante 14: la instrucción pasaría a la pila de llamadas ya que esta se encuentra vacía y procedería a ejecutarse.

|  **PILA DE LLAMADAS**  	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	| **SALIDA POR CONSOLA** 	|
|:----------------------:	|:-----------------------:	|:-----------------------:	|:----------------------:	|
| `watcher.on('change')` 	|            -            	|            -            	|            -           	|
<br>

- Instante 15: dentro de esta encontramos la siguiente instrucción ``console.log(`File ${filename} has been modified somehow`)``, por lo tanto se introducirá en la pila de llamadas y se ejecutará.

|                      **PILA DE LLAMADAS**                     	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	| **SALIDA POR CONSOLA** 	|
|:-------------------------------------------------------------:	|:-----------------------:	|:-----------------------:	|:----------------------:	|
| ``console.log(`File ${filename} has been modified somehow`)`` 	|            -            	|            -            	|            -           	|
|                     `watcher.on('change')`                    	|            -            	|            -            	|            -           	|
<br>

- Instante 17: al ejecutarse mostrará el mensaje correspondiente por pantalla.

|  **PILA DE LLAMADAS**  	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	|             **SALIDA POR CONSOLA**            	|
|:----------------------:	|:-----------------------:	|:-----------------------:	|:---------------------------------------------:	|
| `watcher.on('change')` 	|            -            	|            -            	| File helloworld.txt has been modified somehow 	|
<br>

- Instante 18: al terminar de ejecutarse el `watcher.on('change')` volverá a su posición en el registro de eventos para seguir esperando por cambios en el archivo correspondiente.

| **PILA DE LLAMADAS** 	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	| **SALIDA POR CONSOLA** 	|
|:--------------------:	|:-----------------------:	|:-----------------------:	|:----------------------:	|
|                      	|  `watcher.on('change')` 	|            -            	|            -           	|
<br>

### Ejercicio 2

### Ejercicio 3

### Ejercicio 4

