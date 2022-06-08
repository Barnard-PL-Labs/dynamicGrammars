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
    targetLang = document.getElementById("targetLang").value;
    fetch("https://graphviz-web-vvxsiayuzq-ue.a.run.app/tslsynth?tsl="+tslSpec+"&target="+targetLang)
        .then(response => {
            response.text().then(function(text) {
                document.getElementById("codeBox").value = text;
                console.log(text)
                let script = document.createElement("script");
                let temp = "function updateStateMachine(){\n" + text + "}"
                //gotta change this at some point!
                temp = temp.replace("G4", "\"G4\"")
                temp = temp.replace("E4", "\"E4\"")
                script.text = temp;
                script.setAttribute("id", "synth_script");
                document.body.appendChild(script);
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

var first = true;
document.getElementById("play-button").addEventListener("click", function() {
    if (first) {
        const synthA = new Tone.Synth().toDestination();
        //play a note every quarter-note
        const loopA = new Tone.Loop(time => {
            updateStateMachine();
            console.log(time);
            synthA.triggerAttackRelease(noteToPlay, "8n", time);
        }, "4n").start(0);
        first = false;
    }
    if (Tone.Transport.state !== 'started') {
        // the loop starts when the Transport is started
        Tone.Transport.start()
    }
    else {
        Tone.Transport.stop();
    }
});

var currentState = 0
let noteToPlay = ""