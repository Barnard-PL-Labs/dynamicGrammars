# Structured Editors for logic

Writing specifications in logic (especially temporal logic) is hard.
Needing to memorize the syntax of such logics does not help.
The goal of this repo is to explore how structured editors can be used as an alternative interface for writing temporal logic specifications.

The hypothesis is that structured editors are uniquely well suited for logics because of the relatively small grammar of a logic language.
Whereas structures editors tend to be too restrictive and cumbersome in general purpose programming languages, it should be a better fit for temporal logic.

## Try a live demo

<p><a href="frontEnd/ltl.html">Structured editor for LTL</a></p>
<p><a href="frontEnd/tsl.html">Structured editor for TSL</a></p>

## install

after cloning the repo

    npm install -g nearley

to compile run 

    ./make.sh
