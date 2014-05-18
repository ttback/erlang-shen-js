var erlangjs = require("../erlang.js");

describe('erlang-shen-js', function() {
    describe('#wrap()', function() {
        it('Wrap test 1', function(done) {
            code = 'console:log("hello world").';
            erlangjs.wrap(code, function(ast) {
                ast.should.be.ok;
                done();
            });
        });
    });

    describe('#parse()', function() {
        it('Parse test 1', function(done) {
            code = '-module(tmp).\n-compile({parse_transform, shen}).\n-compile(export_all).\n-js([start/0]).\nstart() ->\nconsole:log("hello world").';
            erlangjs.parse(code, function(ast) {
                ast.should.be.ok;
                done();
            });
        });
    });
});
