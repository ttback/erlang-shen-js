#!/usr/bin/env node
var fs = require('fs');
var esprima = require('esprima');
var exec = require('exec');

exec(['erlc', '-pa', './deps', 'examples/sample.erl'], function(err, out, code) {
  if (err instanceof Error)
    throw err;
  process.stderr.write(err);
 
  var jsCode = fs.readFileSync('./sample.js', "utf8");
  console.log(JSON.stringify(esprima.parse(jsCode), null, 4));

  process.exit(code);
});