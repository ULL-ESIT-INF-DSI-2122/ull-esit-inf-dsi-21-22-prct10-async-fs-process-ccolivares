import * as net from 'net';
export {client};

const client = net.connect({port: 60300});

client.on('data', (dataJSON) => {
  const command_data = JSON.parse(dataJSON.toString());

  if (command_data.type === 'simple_command') {
    console.log(`Conexión establecida...`);
    console.log(`Solicitado el comando ${command_data.command}`);
    console.log(`$ ${command_data.command} ${command_data.argument}`);
    console.log(`---> Contenido del comando:`);
    console.log(`${command_data.content}`);
  } else {
    console.log(`La información recibida no es válida`);
  }
});
