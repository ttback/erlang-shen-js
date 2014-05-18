#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var esprima = require('esprima');
var exec = require('exec');
var path = require('path');
var mv = require('mv');

//Config flags
var INPUT_ERLANG_FILE_PATH = undefined;
var JS_AST_OUTPUT_ENABLED = false;
var DEFAULT_JS_OUTPUT_DIR_PATH = "./";
var JS_OUTPUT_FILE = undefined;

function ouptutAst() {
    return JS_AST_OUTPUT_ENABLED = true;
}

function outputFile(path) {
    JS_OUTPUT_FILE = path;
}

function parseSourceCode(code) {

}

function deleteFiles(filename) {
    var jsfile = filename + ".js";
    var beamfile = filename + ".beam";

    if (fs.existsSync(jsfile))
        fs.unlinkSync(jsfile);
    
    if (fs.existsSync(beamfile))
    fs.unlinkSync(beamfile);
}

//Handle user input
program
    .version('0.0.1')
    .option('-t, --ast', 'Output js ast tree', ouptutAst)
    .option('-o, --output <file>', 'Output to js file', outputFile)
    .option('-c, --code <file>', 'erlang code', parseSourceCode)
    .parse(process.argv);

if (program.args.length > 0) {
    INPUT_ERLANG_FILE_PATH = program.args[0];
} else {
    console.log("Please enter erlang file path. i.e. examples/sample.erl")
}

function cleanUp(code, filename) {
    deleteFiles(filename);
}


if (fs.existsSync(INPUT_ERLANG_FILE_PATH)) {
    exec(['erlc', '-pa', './deps', INPUT_ERLANG_FILE_PATH], function(err, out, code) {
        if (err instanceof Error)
            throw err;
        process.stderr.write(err);

        var erlang_fileName = path.basename(INPUT_ERLANG_FILE_PATH);
        var filename = erlang_fileName.split(".")[0];
        var js_filename = filename + ".js";

        var shen_output_js = DEFAULT_JS_OUTPUT_DIR_PATH + js_filename

        var jsCode = fs.readFileSync(shen_output_js, "utf8");
        var ast = esprima.parse(jsCode, {range: true});

        if (JS_AST_OUTPUT_ENABLED) {
            process.stdout.write(JSON.stringify(ast, null, 4));
        } else {
            process.stdout.write(jsCode);
        }

        if (JS_OUTPUT_FILE) {
            mv(shen_output_js, JS_OUTPUT_FILE, {
                mkdirp: true
            }, function(err) {
                if (err instanceof Error)
                    throw err;
                cleanUp(code, filename);
            });
        } else {
            cleanUp(code, filename);
        }
    });
} else {
    console.log("erlang file path is invalid");
}