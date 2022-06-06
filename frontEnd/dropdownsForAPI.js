function callSynth() {
    tslSpec = delDel(extractContent(document.getElementById("assume").innerText,
        document.getElementById("guarantee").innerText));
    tslSpec = encodeURIComponent(tslSpec.replace(/\n/g, " "));
    console.log(tslSpec);
    targetLang = document.getElementById("targetLang").value;
    fetch("https://graphviz-web-vvxsiayuzq-ue.a.run.app/tslsynth?tsl="+tslSpec+"&target="+targetLang)
        .then(response => {
            response.text().then(function(text) {
                document.getElementById("codeBox").value = text;
            });
        })
        .catch(error => console.error(error));
}

function extractContent (assumeBody, guaranteeBody) {
    let htmlBody = assumeBody + '\n' + guaranteeBody;
    const logicText = document.createElement('span')
    logicText.innerHTML = htmlBody;
    return logicText.innerText;
}