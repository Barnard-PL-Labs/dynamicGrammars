# dynamicGrammars

to install deps

    npm install -g nearley

to compile run 

    nearleyc grammarDef/grammar.ne -o grammarDef/grammar.js 
    browserify -t brfs frontEnd/main.js -o frontEnd/compiled.js

A demo is in /docs (available at https://barnard-pl-labs.github.io/dynamicGrammars/)
