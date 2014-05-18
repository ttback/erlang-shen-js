#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var esprima = require('esprima');
var exec = require('exec');
var path = require('path');
var mv = require('mv');

//Config flags
var TMP_ERL_FILE_PATH = "./tmp.erl";
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

function parse(code, callback) {
    fs.writeFile(TMP_ERL_FILE_PATH, code, function(err) {
        if (err) {
            throw err;
        }

        parseFile(TMP_ERL_FILE_PATH, function(ast){
            if (!ast){
                throw new Error("No ast tree was generated");
            }else{
                callback(ast);
            }
        });
    });
}

function wrap(code, callback) {
    var wrap_str = "-module(tmp).\n-compile({parse_transform, shen}).\n-compile(export_all).\n-js([start/0]).\nstart() ->\n";
    var wrapped_code = wrap_str + code;
    
    fs.writeFile(TMP_ERL_FILE_PATH, wrapped_code, function(err) {
        if (err) throw err;
        parseFile(TMP_ERL_FILE_PATH, function(ast){
            if (!ast){
                throw new Error("No ast tree was generated");
            }else{
                callback(ast);
            }
        });
    });
}

function deleteFiles(filename) {
    var jsfile = filename + ".js";
    var beamfile = filename + ".beam";

    if (fs.existsSync(jsfile))
        fs.unlinkSync(jsfile);
    
    if (fs.existsSync(beamfile))
        fs.unlinkSync(beamfile);

    if (fs.existsSync(TMP_ERL_FILE_PATH))
        fs.unlinkSync(TMP_ERL_FILE_PATH);
}

//Handle user input
program
    .version('0.0.1')
    .option('-t, --ast', 'Output js ast tree', ouptutAst)
    .option('-o, --output <file>', 'Output to js file', outputFile)
    .parse(process.argv);

if (program.args.length > 0 && program.args[0]!="test/test.js") {
    INPUT_ERLANG_FILE_PATH = program.args[0];
} else {
    console.log("Please enter erlang file path. i.e. examples/sample.erl")
}

function cleanUp(code, filename) {
    deleteFiles(filename);
}

if (INPUT_ERLANG_FILE_PATH){
    parseFile(INPUT_ERLANG_FILE_PATH);
}

function parseFile(erlang_file_path, callback) {
    if (fs.existsSync(erlang_file_path)) {
        exec(['erlc', '-pa', './deps', erlang_file_path], function(err, out, code) {
            if (err instanceof Error)
                throw err;
            process.stderr.write(err);

            var erlang_fileName = path.basename(erlang_file_path);
            var filename = erlang_fileName.split(".")[0];
            var js_filename = filename + ".js";

            var shen_output_js = DEFAULT_JS_OUTPUT_DIR_PATH + js_filename

            var jsCode = fs.readFileSync(shen_output_js, "utf8");
            var ast = esprima.parse(jsCode, {
                range: true
            });

            callback(ast);

            if (JS_AST_OUTPUT_ENABLED) {
                process.stdout.write(JSON.stringify(ast, null, 4));
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
}


module.exports={
    parse: parse,
    wrap: wrap
}