"use strict";
exports.__esModule = true;
var net = require("net");
var child_process_1 = require("child_process");
if (process.argv.length !== 4) {
    console.log('ERROR. Defina correctamente los parámetros');
}
else {
    net.createServer(function (connection) {
        console.log('Un cliente se ha conectado.');
        var command_data = (0, child_process_1.spawn)(process.argv[2], [process.argv[3]]);
        command_data.stdout.on('data', function (data) {
            connection.write(JSON.stringify({ 'type': 'simple_command', 'command': process.argv[2],
                'argument': process.argv[3], 'content': data.toString() }) + '\n');
        });
        connection.on('close', function () {
            console.log('Un cliente se ha desconectado.');
        });
    }).listen(60300, function () {
        console.log('Esperando conexiones...');
    });
}
