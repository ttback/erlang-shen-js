Erlang JavaScript Parse Transform
=================================

Goal:
---------
Make Erlang usable for online editors and live code teaching platforms like Code School and Code Combat.


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
  
  //Wrap erlang code with: 
  //"-module(tmp).\n-compile({parse_transform, shen}).\n-compile(export_all).\n-js([start/0]).\nstart() ->\n";
  erlangjs.wrap(code, function(ast) {
        //ast: the js obj holding the AST tree
  });
  
  //Parse complete erlang code
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

Creator of Shen:

    * Maxim Sokhatsky
    * Andrew Zadorozhny
    
## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


