// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "formula", "symbols": ["atom"]},
    {"name": "formula", "symbols": [{"literal":"!"}, "formula"]},
    {"name": "formula$string$1", "symbols": [{"literal":"|"}, {"literal":"|"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "formula", "symbols": ["formula", "formula$string$1", "formula"]},
    {"name": "formula$string$2", "symbols": [{"literal":"&"}, {"literal":"&"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "formula", "symbols": ["formula", "formula$string$2", "formula"]},
    {"name": "formula", "symbols": ["formula", {"literal":"U"}, "formula"]},
    {"name": "formula", "symbols": [{"literal":"G"}, "formula"]},
    {"name": "formula", "symbols": [{"literal":"F"}, "formula"]},
    {"name": "formula", "symbols": ["predTerm"]},
    {"name": "formula$string$3", "symbols": [{"literal":"<"}, {"literal":"-"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "formula", "symbols": [{"literal":"["}, "sig_out", "formula$string$3", "fxnTerm", {"literal":"]"}]},
    {"name": "predTerm$string$1", "symbols": [{"literal":"p"}, {"literal":"_"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "predTerm", "symbols": ["predTerm$string$1"]},
    {"name": "predTerm$string$2", "symbols": [{"literal":"p"}, {"literal":"_"}, {"literal":"1"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "predTerm", "symbols": ["predTerm$string$2", "fxnTerm"]},
    {"name": "predTerm$string$3", "symbols": [{"literal":"p"}, {"literal":"_"}, {"literal":"2"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "predTerm", "symbols": ["predTerm$string$3", "fxnTerm", "fxnTerm"]},
    {"name": "fxnTerm", "symbols": ["sig_in"]},
    {"name": "fxnTerm$string$1", "symbols": [{"literal":"f"}, {"literal":"_"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "fxnTerm", "symbols": ["fxnTerm$string$1"]},
    {"name": "fxnTerm$string$2", "symbols": [{"literal":"f"}, {"literal":"_"}, {"literal":"1"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "fxnTerm", "symbols": ["fxnTerm$string$2", "fxnTerm"]},
    {"name": "fxnTerm$string$3", "symbols": [{"literal":"f"}, {"literal":"_"}, {"literal":"2"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "fxnTerm", "symbols": ["fxnTerm$string$3", "fxnTerm", "fxnTerm"]},
    {"name": "sig_in$string$1", "symbols": [{"literal":"i"}, {"literal":"n"}, {"literal":"S"}, {"literal":"i"}, {"literal":"g"}, {"literal":"n"}, {"literal":"a"}, {"literal":"l"}, {"literal":"_"}, {"literal":"w"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "sig_in", "symbols": ["sig_in$string$1"]},
    {"name": "sig_in$string$2", "symbols": [{"literal":"i"}, {"literal":"n"}, {"literal":"S"}, {"literal":"i"}, {"literal":"g"}, {"literal":"n"}, {"literal":"a"}, {"literal":"l"}, {"literal":"_"}, {"literal":"x"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "sig_in", "symbols": ["sig_in$string$2"]},
    {"name": "sig_out$string$1", "symbols": [{"literal":"o"}, {"literal":"u"}, {"literal":"t"}, {"literal":"S"}, {"literal":"i"}, {"literal":"g"}, {"literal":"n"}, {"literal":"a"}, {"literal":"l"}, {"literal":"_"}, {"literal":"y"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "sig_out", "symbols": ["sig_out$string$1"]},
    {"name": "sig_out$string$2", "symbols": [{"literal":"o"}, {"literal":"u"}, {"literal":"t"}, {"literal":"S"}, {"literal":"i"}, {"literal":"g"}, {"literal":"n"}, {"literal":"a"}, {"literal":"l"}, {"literal":"_"}, {"literal":"z"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "sig_out", "symbols": ["sig_out$string$2"]},
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
