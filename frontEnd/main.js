const fs = require('fs')

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
select.selectedIndex = -1;

document.getElementsByName('grammarSelector').forEach(s => {
    s.onchange = onchangeListener;
});

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
    console.log(this.value)

    let select = document.createElement('select');
    select.onchange = onchangeListener;
    //if rule if a simple non terminal
    if (ruleMap.has(this.value)) {
        ruleMap.get(this.value).forEach(elem => {
            let option = document.createElement('option');
            option.text = option.value = elem;
            select.add(option, 0);
        })
        select.selectedIndex = -1;
        document.getElementById("selectors").insertBefore(select, this);
    }
    //if rule combines non terminals
    else if (Array.from(ruleMap.keys()).map(l => (this.value).includes(l))) {
        //generate dropdowns for all nonterminals, and insert text as needed
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
        const openParen = document.createElement('span')
        openParen.innerHTML = "("
        const closeParen = document.createElement('span')
        closeParen.innerHTML = ")"
        newDropdowns = [openParen, ...newDropdowns, closeParen]
        newDropdowns.forEach(elem => {
            document.getElementById("selectors").insertBefore(elem, this);
        });
    }
    //else we have selected a terminal
    else {
        //insert the terminal as text
    }
    this.remove();
}

