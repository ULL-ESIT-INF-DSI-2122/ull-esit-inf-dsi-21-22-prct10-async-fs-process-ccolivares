"use strict";
exports.__esModule = true;
exports.client = void 0;
var net = require("net");
var client = net.connect({ port: 60300 });
exports.client = client;
client.on('data', function (dataJSON) {
    var command_data = JSON.parse(dataJSON.toString());
    if (command_data.type === 'simple_command') {
        console.log("Conexi\u00F3n establecida...");
        console.log("Solicitado el comando ".concat(command_data.command));
        console.log("$ ".concat(command_data.command, " ").concat(command_data.argument));
        console.log("---> Contenido del comando:");
        console.log("".concat(command_data.content));
    }
    else {
        console.log("La informaci\u00F3n recibida no es v\u00E1lida");
    }
});
