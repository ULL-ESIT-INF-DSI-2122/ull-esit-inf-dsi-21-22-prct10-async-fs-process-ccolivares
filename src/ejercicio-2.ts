import * as yargs from 'yargs';
import * as fs from 'fs';
import {spawn} from 'child_process';

/**
 * Paquete yargs para línea de comandos
 */
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

/**
 * Funcion que realiza la búsqueda con el método pipe
 * @param path ruta del archivo
 * @param word palabra a buscar
 */
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

/**
 * Funcion que realiza la búsqueda sin el método pipe
 * @param path ruta del archivo
 * @param word palabra a buscar
 */
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
