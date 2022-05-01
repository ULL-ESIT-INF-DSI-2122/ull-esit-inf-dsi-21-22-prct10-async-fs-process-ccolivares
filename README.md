[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-ccolivares/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-ccolivares?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-ccolivares&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-ccolivares)

[INFORME EN GITHUB PAGES](https://ull-esit-inf-dsi-2122.github.io/ull-esit-inf-dsi-21-22-prct10-async-fs-process-ccolivares/)

# Práctica 10. Sistema de ficheros y creación de procesos en Node.js

## Introducción

En esta práctica trabajaremos con las API's proporcionadas por Node.js, familiarizandonos con ellas y practicando sus distintos usos, entre ellos interactuar con el sistema de ficheros y crear procesos. 

## Desarrollo de los ejercicios

### Ejercicio 1: Traza de un código asíncrono

[--> Acceso al código de ejemplo en Github](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-ccolivares/blob/main/src/ejercicio-1.ts)

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

- Instante 1: se introduce el proceso `access` a la pila de llamadas

| **PILA DE LLAMADAS** 	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	| **SALIDA POR CONSOLA** 	|
|:--------------------:	|:-----------------------:	|:-----------------------:	|:----------------------:	|
|        ACCESS        	|            -            	|            -            	|            -           	|
<br>

- Instante 2: `access` sale de la pila de llamada y su callback pasa al registro de eventos.

| **PILA DE LLAMADAS** 	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	| **SALIDA POR CONSOLA** 	|
|:--------------------:	|:-----------------------:	|:-----------------------:	|:----------------------:	|
|           -          	|          ACCESS          	|            -            	|            -           	|
<br>

- Instante 3: el callback de `access` pasa a la cola de manejadores.

| **PILA DE LLAMADAS** 	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	| **SALIDA POR CONSOLA** 	|
|:--------------------:	|:-----------------------:	|:-----------------------:	|:----------------------:	|
|           -          	|            -            	|        	 ACCESS         	|            -           	|
<br>

- Instante 4: el callback de `access` pasa a la pila de llamadas y comienza a ejecutarse.

|     **PILA DE LLAMADAS**     	| **REGISTRO DE EVENTOS** 	| **COLA DE MANEJADORES** 	| **SALIDA POR CONSOLA** 	|
|:----------------------------:	|:-----------------------:	|:-----------------------:	|:----------------------:	|
|       EJECUTANDO ACCESS     	|            -            	|            -            	|            -           	|
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

Se nos indica en el enunciado que hagamos la traza con minimo dos modificaciones del fichero, esta segunda modificación se realizaría repitiendo los pasos del 13 al 18 (partiendo de que el `watcher.on('change')` esta en el registro de eventos como acaba en el paso 18) y si se quisiera una tercera se repetirían los mismos pasos y así sucesivamente.

- ¿Qué hace la función access? ¿Para qué sirve el objeto constants?

La función `access` de Node.js es un método utilizado para comprobar los permisos de un archivo o directorio determinado. Los permisos que se van a comprobar pueden ser especificados como un parámetro usando las constantes de acceso a archivos (objeto `constants`) que son las que contienen las constantes mas utilizadas para operaciones de permisos.
<br>

### Ejercicio 2: Buscador de palabras en un archivo

[--> Acceso al ejercicio 2 en Github](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-ccolivares/blob/main/src/ejercicio-2.ts)

En este ejercicio se nos pide realizar un programa que devuelva el número de ocurrencias de una palabra en un fichero. Utilizaremos dos estrategias para realizar este programa, la primera será el uso del método `pipe` de un Stream, además del uso de los comandos `cat` y `grep` de Unix/Linux; y la segunda será sin utilizar el metodo `pipe`, simplemente tratando la salida del comando `cat`.

Como se nos pide que los datos necesarios sean pasados al programa desde la linesa de comandos utilizaremos el paquete `yargs`. 

```typescript
yargs.command({
  command: 'search',
  describe: 'Buscador de palabras en ficheros',
  builder: {
    path: { 
      describe: 'Nombre o ruta del fichero',
      demandOption: true,
      type: 'string',
    },
    word: {
      describe: 'Palabra a buscar en el fichero',
      demandOption: true,
      type: 'string',
    },
    pipe: {
      describe: 'Utilizar o no utilizar pipe',
      demandOption: false,
      type: 'boolean',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string' && typeof argv.word === 'string') {
      if (argv.pipe) {
        pipe(argv.path, argv.word);
      } else {
        noPipe(argv.path, argv.word);
      }
    } else {
      console.log("ERROR: No se han especificado los parámetros correctamente");
    }
  },
});

yargs.parse();
```

Podemos ver como se crean 3 opciones: `path` para la ruta del fichero, `word` como la palabra buscada en dicho fichero y `pipe` como un flag que si está activado utilizaremos el método `pipe` (llamando a la función `pipe()`) y por el contrario no lo utilizaremos (llamando a la función `noPipe()`). 

La funcion `pipe()` recibe en sus parámetros la ruta del fichero y la palabra que se desea buscar.

```typescript
function pipe(path: string, word: string) {
  if (fs.existsSync(path)) {
    const cat = spawn('cat', [path]);
    const grep = spawn('grep', ['-o', word]);
  
    cat.stdout.pipe(grep.stdin);

    grep.stdout.on('data', (data) => {
      console.log(`Se encontro ${data.toString().split('\n').length - 1} veces la palabra ${word} en el archivo ${path} (método pipe)`);
    });
    
  } else {
    console.log("ERROR: No se encuentra el archivo especificado");
  }
}
```

Como podemos observar utilizamos el método `spawn()` para crear procesos con los comandos deseados `cat` y `grep`, este último con la opción `-o` que imprime los resultados que coinciden con la expresión que le pasaremos a su lado (en nuestro caso la palabra buscada), es decir, si estuvieramos buscando la palabra "hello" el comando se vería de la siguiente forma: `grep -o hello`

En el repositorio encontramos el archivo `helloworld.txt` con frases aleatorias:
```
hello world hello hello
how are you hello
```

Al hacer el comando `grep -o hello` la salida quedaría de la siguiente forma:
```
hello
hello
hello
hello
```

Por lo tanto para lograr el objetivo que tenemos en primer lugar vamos a redirigir la salida del comando `cat` al comando `grep`, cuando este detecte que tiene informacion con la que tratar procederemos a procesarla, convirtiendola en una string y aplicandole el método `split` para dividirla (utilizando como separador los espacios) y convertirla en un array al que podemos aplicarle el método `length` y ajustar su resultado.

Ahora veremos nuestra segunda estrategia sin utilizar el método `pipe`:

```typescript
function noPipe(path: string, word: string) {
  if (fs.existsSync(path)) {
    const cat = spawn('cat', [path]);
    let catOutput = '';
    
    cat.stdout.on('data', (data) => {
      catOutput += data;
    });
    
    let aux: number = 0;
    cat.stdout.on('close', () => {
      let output_aux: string[] = catOutput.split(/\s/);
      output_aux.forEach((element) => {
        if (element == word) {
          aux++;
        }
      });

      console.log(`Se encontro ${aux} veces la palabra ${word} en el archivo ${path} (método no pipe)`);
    });
    
  } else {
    console.log("ERROR: No se encuentra el archivo especificado");
  }
}
```

En este caso solo trabajaremos con el comando `cat`, almacenaremos su salida en una variable auxiliar llamada `catOutput`. Cuando detectamos que el comando se ha terminado de ejecutarse comenzamos a buscar el término que deseamos, procesamos la salida `catOutput` haciendo un split y convirtiendola en un array con cada uno de los elementos (cada palabra, considerando el delimitador el espacio) obtenidos del comando `cat`. Recorreremos este array obtenido y compararemos cada una de sus posiciones con el término deseado, sumando un contador cada vez que tenemos una búsqueda exitosa y obteniendo así el número de ocurrencias.
<br>

### Ejercicio 3: Controlar cambios realizados en un directorio especificado

[--> Acceso al ejercicio 3 en Github](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-ccolivares/blob/main/src/ejercicio-3.ts)

Se nos pide desarrollar un programa que reciba desde línea de comandos un nombre de un usuario y observe el directorio donde están almacenadas las notas de ese usuario esperando un cambio y se de información sobre el directorio en tiempo real. 

En primer lugar para la opción de la línea de comandos utilizaremos el paquete `yargs`:

```typescript
yargs.command({
  command: 'watch',
  describe: 'Observa los archivos de un mismo usuario esperando un cambio',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      let path: string = './database' + '/' + argv.user;
      watch(path, argv.user);
    }
    else
      console.log("ERROR: Introducción de datos erronea");
  },
});

yargs.parse();
```

En este caso nuestro comando tiene una única opcion que es el parámetro obligatorio que representa al nombre del usuario (ya que nuestra biblioteca de notas se encuentra en la carpeta `/database` de la raíz y los usuarios son subdirectorios con sus correspondientes notas) y como podemos observar construimos una dirección a partir de ese usuario que se nos proporciona y el directorio `/database` y la almacenamos en una variable para llamar con ella y el nombre del usuario a nuestra función `watch()`.

la funcion `watch()` tiene como objetivo observar los cambios de un directorio:

```typescript
function watch(path: string, user: string) {
  fs.readdir(path, (err, prev_content) => {
    if (err) {
      console.log('ERROR: No se ha podido leer el directorio');

    } else {
      console.log("Estoy observando...");
      fs.watch(path, (eventType, filename) => {
        console.log(`Ha habido un cambio en el directorio de ${user}`);
        if (eventType == "rename") {
          fs.readdir(path, (err, curr_content) => {
            if (err) {
              console.log('ERROR: No se ha podido leer el directorio');
            } else {
              if (prev_content.length < curr_content.length) {
                console.log(`Se ha creado el archivo ${filename}`);
              } else {
                console.log(`Se ha eliminado el archivo ${filename}`);
              }
              prev_content = curr_content;
            }
          });
        }
        if (eventType == "change") {
          console.log(`Se ha modificado el archivo ${filename}`);
        }
      });
    }
  });
}
```

Para esta función tendremos en cuenta que debe observar cambios así que nos interesa el tamaño que tiene el directorio antes y despues de detectar un cambio, para poder obtener este dato utilizaremos el método `readdir()` que además nos ayudará a comprobar que se puede leer el directorio. El contenido del directorio se encuentra en la variable `prev_content` que utilizaremos más adelante.

Procedemos a utilizar el método `watch()` para observar los cambios en el directorio. En primer lugar nos interesa el evento `rename` pero este evento no nos informa concretamente de lo que necesitamos saber por lo tanto comprobaremos los tamaños de los contenidos del directorio antes y despues de recibir un evento de cambio. Volvemos a utilizar la función `readdir()` para obtener el tamaño del directorio y lo comparamos con el tamaño que teniamos anteriormente, si es mayor que el anterior significa que se ha creado un nuevo archivo, y en el caso contrario es que se ha eliminado. Y para finalizar actualizamos el contenido previo con el nuevo para futuras modificaciones en la misma ejecución.

Para el caso en el que simplemente se produce un cambio dentro de un archivo del directorio (es decir que el tamaño del directorio no cambia) utilizaremos el evento `change` para detectar modificaciones en archivos. 