function callSynth(id) {
    if (id==0){
        // structured editor
        tslSpec = delDel(extractContent(document.getElementById("assume").innerText,
            document.getElementById("guarantee").innerText));
    }
    else if (id==1){
        // text editor
        tslSpec = document.getElementById("specBox").value;
    }
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

function toTE() {
    document.getElementsByClassName('SE')[0].
        style.display = 'none';
    document.getElementsByClassName('TE')[0].
        style.display = 'initial';
    editorNum = 1;
}

function toSE() {
    document.getElementsByClassName('TE')[0].
        style.display = 'none';
    document.getElementsByClassName('SE')[0].
        style.display = 'initial';
    editorNum = 0;
}

function extractContent (assumeBody, guaranteeBody) {
    let htmlBody = assumeBody + '\n' + guaranteeBody;
    const logicText = document.createElement('span')
    logicText.innerHTML = htmlBody;
    return logicText.innerText;
}