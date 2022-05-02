import * as net from 'net';
import {spawn} from 'child_process';

if (process.argv.length !== 4) {
  console.log('ERROR. Defina correctamente los parámetros');
} else {
  
  /**
   * Server que procesa comandos y los envia al cliente con sus datos
   */
  net.createServer((connection) => {
    console.log('Un cliente se ha conectado.');

    const command_data = spawn(process.argv[2], [process.argv[3]]);

    command_data.stdout.on('data', (data) => {
      connection.write(JSON.stringify({ 'type': 'simple_command', 'command': process.argv[2], 
                                        'argument': process.argv[3], 'content': data.toString()}) +'\n');
    });

    connection.on('close', () => {
      console.log('Un cliente se ha desconectado.');
    });

  }).listen(60300, () => {
    console.log('Esperando conexiones...');
  });
}
