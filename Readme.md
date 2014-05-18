Erlang JavaScript Parse Transform
=================================

Prerequisites:
---------

Erlang: Best way is to install through `brew install erlang` on Mac or build from source. 

Shen: A project from n2o folks that compiles erlang to JavaScript, node.js, Browser, Client-Side FRP

Esprima: Build JS AST for the generated JS code.


Usage:
---------

  Node.js
  
  ```Javascript
  var erlangjs = require("erlang-shen-js");
  erlangjs.wrap(code, function(ast) {
        //ast: the js obj holding the AST tree
  });
  
  erlangjs.parse(code, function(ast) {
        //ast: the js obj holding the AST tree
  });
  
  ```

  Commandline Options:

    -h, --help           Output usage information
    -V, --version        Output the version number
    -t, --ast            Output JS ast tree
    -o, --output <file>  Output to a JS file to custom location


Install
---------

Run `npm install erlang-shen-js -g`


Roadmap
-------

1. multiple clauses for lambdas
2. list comprehensions
3. more JavaScript/OTP mappings
4. if statement :-)


Credits
-------

    * Maxim Sokhatsky
    * Andrew Zadorozhny
