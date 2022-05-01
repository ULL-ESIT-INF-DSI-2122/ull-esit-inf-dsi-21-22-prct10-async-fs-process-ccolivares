import * as yargs from 'yargs';
import * as fs from 'fs';

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