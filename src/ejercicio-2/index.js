"use strict";
exports.__esModule = true;
var yargs = require("yargs");
var fs = require("fs");
var child_process_1 = require("child_process");
yargs.command({
    command: 'search',
    describe: 'Buscador de palabras en ficheros',
    builder: {
        path: {
            describe: 'Nombre o ruta del fichero',
            demandOption: true,
            type: 'string'
        },
        word: {
            describe: 'Palabra a buscar en el fichero',
            demandOption: true,
            type: 'string'
        },
        pipe: {
            describe: 'Utilizar o no utilizar pipe',
            demandOption: false,
            type: 'boolean'
        }
    },
    handler: function (argv) {
        if (typeof argv.path === 'string' && typeof argv.word === 'string') {
            if (argv.pipe) {
                pipe(argv.path, argv.word);
            }
            else {
                noPipe(argv.path, argv.word);
            }
        }
        else {
            console.log("ERROR: No se han especificado los parámetros correctamente");
        }
    }
});
yargs.parse();
function pipe(path, word) {
    if (fs.existsSync(path)) {
        var cat = (0, child_process_1.spawn)('cat', [path]);
        var grep = (0, child_process_1.spawn)('grep', ['-o', word]);
        cat.stdout.pipe(grep.stdin);
        grep.stdout.on('data', function (data) {
            console.log("Se encontro ".concat(data.toString().split('\n').length - 1, " veces la palabra ").concat(word, " en el archivo ").concat(path, " (m\u00E9todo pipe)"));
        });
    }
    else {
        console.log("ERROR: No se encuentra el archivo especificado");
    }
}
function noPipe(path, word) {
    if (fs.existsSync(path)) {
        var cat = (0, child_process_1.spawn)('cat', [path]);
        var catOutput_1 = '';
        cat.stdout.on('data', function (data) {
            catOutput_1 += data;
        });
        var aux_1 = 0;
        cat.stdout.on('close', function () {
            var output_aux = catOutput_1.split(/\s/);
            output_aux.forEach(function (element) {
                if (element == word) {
                    aux_1++;
                }
            });
            console.log("Se encontro ".concat(aux_1, " veces la palabra ").concat(word, " en el archivo ").concat(path, " (m\u00E9todo no pipe)"));
        });
    }
    else {
        console.log("ERROR: No se encuentra el archivo especificado");
    }
}
