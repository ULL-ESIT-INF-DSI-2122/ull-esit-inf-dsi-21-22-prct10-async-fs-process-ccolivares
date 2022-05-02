import 'mocha';
import { expect } from 'chai';
import * as net from 'net';
import { client } from '../../src/PE-102-LUNES-2-MAYO/client'

describe ('Comprobar el envío del cliente', () => {
  client.on('simple_command', (data) => {
    expect(data).to.be.eql({'type': 'simple_command', 'command': 'cat', 'argument': 'helloworld.txt', 'content': ' '});
  });
});