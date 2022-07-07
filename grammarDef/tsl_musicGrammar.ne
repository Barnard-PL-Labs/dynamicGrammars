formula ->
    "!" formula | formula "||" formula | formula "&&" formula |
    formula "U" formula | "G" formula | "F" formula | "X" formula | formula "->" formula |
    formula "<->" formula | "[" sig_out "<-" fxnTerm "]" | sig_in
fxnTerm ->  note | rhyth | eff | speed
sig_in -> "buttonPress" 
sig_out ->  "noteToPlay" | "rhythm" | "effect" | "tempoSpeed"
note -> "E4" | "G4" | "hihat" | "snare" 
rhyth -> "eigthnote" | "halfnote" | "quarternote"
eff -> "None" | "Wah" | "Reverb"
speed -> "2n" | "4n" | "8n" 


