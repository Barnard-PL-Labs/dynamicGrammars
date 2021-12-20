const nearley = require("nearley");
const grammar = require("../grammarDef/grammar.js");
const fs = require('fs')

// Create a Parser object from our grammar.
const parser = new nearley.Parser(
    nearley.Grammar.fromCompiled(grammar)
);

//using brfs to read static assets
const grammarDef = fs.readFileSync(__dirname + '/../grammarDef/grammar.ne', 'utf8')
let rules = grammarDef.trim().split("\n")
const ruleMap = new Map();
rules.forEach(r => {
    let rule = r.split(" -> ");
    let left = rule[0]
    let right = rule[1].split(" | ").map(v => v.trim())
    ruleMap.set(left, right)
});
console.log(ruleMap);

//set the initial element to the first rule of the grammar
let select = document.getElementById('start');
Array.from(ruleMap.values())[0].forEach(elem => {
    let option = document.createElement('option');
    option.text = option.value = elem;
    select.add(option, 0);
});

document.getElementsByName('grammarSelector').forEach(s => {
    s.onchange = function (event) {
        console.log(this.value)

        select = document.createElement('select');
        //if rule if a simple non terminal
        if (ruleMap.has(this.value)) {
            ruleMap.get(this.value).forEach(elem => {
                let option = document.createElement('option');
                option.text = option.value = elem;
                select.add(option, 0);
            })
            document.getElementById("selectors").appendChild(select);
            this.remove();
        }
        //if rule combines non terminals
        else if (false) {
            //generate dropdowns for all nonterminals, and insert text as needed
        }
        //else we have selected a terminal
        else {
            //insert the terminal as text
        }
    }
});

// Parse something!
parser.feed("!a\\/b");

// parser.results is an array of possible parsings.
console.log(parser.results); // [[[[ "foo" ],"\n" ]]]

