#!/bin/bash
nearleyc grammarDef/ltl_grammar.ne -o grammarDef/ltl_grammar.js
nearleyc grammarDef/tsl_grammar.ne -o grammarDef/tsl_grammar.js
browserify -t brfs frontEnd/ltl.js -o frontEnd/ltl_compiled.js
browserify -t brfs frontEnd/tsl.js -o frontEnd/tsl_compiled.js
