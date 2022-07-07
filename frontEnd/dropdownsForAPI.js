var currentState = 0
let noteToPlay = ""
let rhythm = "8n"
let effect = ""
let tempoSpeed = "4n"
var randomNum;
var buttonPress = false
var rand = false

const callSynth = id => {
    //reset updateStateMachine() after every synthesis
    let prevSynthesized = document.getElementById("synth_script");
    if(prevSynthesized) {
        prevSynthesized.remove();
    }
    reset();
    //switch between interfaces
    if (id == 0) {
        debugger;
    } else if (id==1){
        // text editor
        tslSpec = document.getElementById("specBox").value;
    } else {
        // structured editor
        tslSpec = delDel(extractContent(document.getElementById("assume").innerText,
            document.getElementById("guarantee").innerText));
    }
    tslSpec = encodeURIComponent(tslSpec.replace(/\n/g, " "));
    targetLang = document.getElementById("targetLang").value;
    fetch("https://graphviz-web-vvxsiayuzq-ue.a.run.app/tslsynth?tsl="+tslSpec+"&target="+targetLang)
        .then(response => {
            response.text().then(function(text) {
                document.getElementById("codeBox").value = text;
                //append generated script code to client side
                let script = document.createElement("script");
                let temp = "function updateStateMachine(){\n" + text + "}"
                //gotta change this at some point!
                temp = temp.replaceAll("G4", "\"G4\"")
                temp = temp.replaceAll("E4", "\"E4\"")
                temp = temp.replaceAll("2n", "\"2n\"")
                temp = temp.replaceAll("4n", "\"4n\"")
                temp = temp.replaceAll("8n", "\"8n\"")
                temp = temp.replaceAll("None", "\"None\"")
                temp = temp.replaceAll("Wah", "\"Wah\"")
                temp = temp.replaceAll("Reverb", "\"Reverb\"")
                temp = temp.replaceAll("hihat", "\"hihat\"")
                temp = temp.replaceAll("snare", "\"snare\"")
                temp = temp.replaceAll("eigthnote", "\"8n\"")
                temp = temp.replaceAll("halfnote", "\"2n\"")
                temp = temp.replaceAll("quarternote", "\"4n\"")
                script.text = temp;
                script.setAttribute("id", "synth_script");
                document.body.appendChild(script);
            });
        })
        .catch(error => console.error(error));
};

// switch to the text editor
// update the text editor content when changed from structured editor to text editor
const toTE = () => {
    document.getElementById('specBox').innerHTML = delDel(extractContent(document.getElementById("assume").innerText,
        document.getElementById("guarantee").innerText));
    document.getElementsByClassName('SE')[0].
        style.display = 'none';
    document.getElementsByClassName('TE')[0].
        style.display = 'initial';
    // editorNum = 1 for text editor
    editorNum = 1;
};

function playAudio(newSound)
{
    console.log(newSound);
    const player = new Tone.Player("./vocal_cymantics/" + newSound + ".wav").toDestination();
    player.autostart = true;
}

// switch to the structured editor
const toSE = () => {
    document.getElementsByClassName('TE')[0].
        style.display = 'none';
    document.getElementsByClassName('SE')[0].
        style.display = 'initial';
    // editorNum = 0 for structure editor
    editorNum = 0;
};

const extractContent = (assumeBody, guaranteeBody) => {
    let htmlBody = assumeBody + '\n' + guaranteeBody;
    const logicText = document.createElement('span')
    logicText.innerHTML = htmlBody;
    return logicText.innerText;
};

const reset = () => {
    currentState = 0
    noteToPlay = ""
    effect = ""
    tempoSpeed = "4n"
    rhythm = "8n"
    buttonPress = false
    rand = false
};

const pressed = () => {buttonPress = true;};

// Button toggles false if user clicks on it again
const released = () => {buttonPress = false;};

const snare = new Tone.Player("./vocal_cymantics/" + "snare" + ".wav").toDestination();
snare.loop = false;
const hihat = new Tone.Player("./vocal_cymantics/" + "hihat" + ".wav").toDestination();
hihat.loop = false;
samplePlayers = {"snare": snare, "hihat": hihat};

const reverb = new Tone.JCReverb(0.3).toDestination();
const delay = new Tone.FeedbackDelay(0+0.2).toDestination();
const synth = new Tone.DuoSynth().chain(delay, reverb);

const autoWah = new Tone.AutoWah(50, 6, -30).toDestination();
const synthWah = new Tone.Synth().connect(autoWah);
autoWah.Q.value = (1.1);
//template
var first = true;
let playButton = document.getElementById("play-button")
var rev = document.getElementById('reverseToggle');
playButton.addEventListener("click", function() {
    if (first) {
        playButton.innerText = "Pause Music!"
        const synthA = new Tone.Synth().toDestination();
        var sliderDiv = document.getElementById("sliderAmount");
        var loopSpeed = sliderDiv.innerHTML;
        console.log("Loop speed original: " + loopSpeed);
        const loopA = new Tone.Loop(time => {
            updateStateMachine();
            console.log("EFFECT: " + effect);
            sliderDiv = document.getElementById("sliderAmount");
            if (sliderDiv.innerHTML == loopSpeed) {
                if (noteToPlay == "E4" || noteToPlay == "G4") {
                    if (effect == "Reverb") {
                        synth.triggerAttackRelease(noteToPlay, rhythm);
                    }
                    else if (effect == "Wah") {

                        synthWah.triggerAttackRelease(noteToPlay, rhythm);
                    }
                    else{
                        synthA.triggerAttackRelease(noteToPlay, rhythm, time);
                    }
                    
                }
                else {
                        samplePlayers[noteToPlay].start().stop("+16n");
                }
            }
            else
            {
                loopSpeed = sliderDiv.innerHTML;
                loopA.interval = loopSpeed + "n";
                loopA.start(0);
            }
        }, tempoSpeed).start(0);
        first = false;
    }
    if (Tone.Transport.state !== 'started') {
        // the loop starts when the Transport is started
        Tone.Transport.start()
        playButton.innerText = "Pause Music!"
    }
    else {
        Tone.Transport.stop();
        playButton.innerText = "Play Music!"
        reset();
    }
});


const updateSlider = slideAmount => {
    var sliderDiv = document.getElementById("sliderAmount");
    sliderDiv.innerHTML = slideAmount;
};

const colorchange = () => {
    var currentClass = rev.getAttribute("class");
    if(currentClass == 'btnPRESSED')
    {
        rev.setAttribute("class", "btnOFF");
        rev.value = "Reverse On";
        console.log(rev.value);
        pressed();
    } else {
        rev.setAttribute("class", "btnPRESSED");
        rev.value = "Reverse Off";
        console.log(rev.value);
        released();
    }
};

const randomNumber = () => {
    randomNum = Math.floor(Math.random() * 10) + 1;
    console.log(randomNum);
};




