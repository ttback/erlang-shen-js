-module(simple).
-compile({parse_transform, shen}).
-compile(export_all).

-js([start/0]).

start() ->
    console:log("hello world").