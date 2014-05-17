    -module(fac).
    -compile({parse_transform, shen}).
    -compile(export_all).

    -js([start/0,fac/1]).

    start() ->
        N = fac(5),
        console:log("factorial ~p", [J, N]).

    fac(0) -> 1;
    fac(N) -> N * fac(N-1).