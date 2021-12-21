const fs = require('fs')

//using brfs to read static assets
//expects a very simple structure of the grammar file
const grammarDef = fs.readFileSync(__dirname + '/../grammarDef/grammar.ne', 'utf8')
let rules = grammarDef.trim().split("\n")
const ruleMap = new Map();
rules.forEach(r => {
    let rule = r.split(" -> ");
    let left = rule[0]
    let right = rule[1].split(" | ").map(v => v.trim())
    ruleMap.set(left, right)
});

//set the initial element to the first rule of the grammar
document.getElementById("selectors").appendChild(genDropdown(Array.from(ruleMap.keys())[0]))

function genDropdown(k) {
    let select = document.createElement('select');
    select.onchange = onchangeListener;
    ruleMap.get(k).forEach(elem => {
        let option = document.createElement('option');
        option.text = option.value = elem;
        select.add(option, 0);
    })
    select.selectedIndex = -1;
    return select;
}

function onchangeListener(event) {
    //if rule if a simple non terminal
    if (ruleMap.has(this.value)) {
        document.getElementById("selectors").insertBefore(genDropdown(this.value), this);
    }
    //if rule combines non terminals
    else if (Array.from(ruleMap.keys()).map(l => (this.value).includes(l))) {
        //generate dropdowns for all nonterminals, and insert text as needed
        //expects rule components to be space seperated
        let newDropdowns = this.value.split(" ").map(e => {
            let replacementVal = document.createElement('span');
            replacementVal.innerHTML = e.slice(1,-1)
            Array.from(ruleMap.keys()).forEach(g => {
                if (g == e) {
                    replacementVal = genDropdown(g);
                }
            })
            return replacementVal;
        })
        
        if (newDropdowns.length > 1) {
            newDropdowns = addParens(newDropdowns)
        }   
        newDropdowns.forEach(elem => {
            document.getElementById("selectors").insertBefore(elem, this);
        });
    }

    this.remove();
}

function addParens(ds) {
    const openParen = document.createElement('span')
    openParen.innerHTML = "("
    const closeParen = document.createElement('span')
    closeParen.innerHTML = ")"
    return [openParen, ...ds, closeParen]
}
