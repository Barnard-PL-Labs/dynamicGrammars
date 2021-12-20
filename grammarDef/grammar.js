// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "formula$subexpression$1", "symbols": [{"literal":"!"}, "formula"]},
    {"name": "formula", "symbols": ["formula$subexpression$1"]},
    {"name": "formula$subexpression$2$string$1", "symbols": [{"literal":"\\"}, {"literal":"/"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "formula$subexpression$2", "symbols": ["formula", "formula$subexpression$2$string$1", "formula"]},
    {"name": "formula", "symbols": ["formula$subexpression$2"]},
    {"name": "formula$ebnf$1", "symbols": ["atom"]},
    {"name": "formula$ebnf$1", "symbols": ["formula$ebnf$1", "atom"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "formula", "symbols": ["formula$ebnf$1"]},
    {"name": "atom", "symbols": [{"literal":"a"}]},
    {"name": "atom", "symbols": [{"literal":"b"}]}
]
  , ParserStart: "formula"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
