formula ->
    "!" formula | formula "||" formula | formula "&&" formula |
    formula "U" formula | "G" formula | "F" formula | "X" formula | formula "->" formula |
    formula "<->" formula | "[" sig_out "<-" fxnTerm "]" | sig_in
fxnTerm ->  note | rhyth | audio
sig_in -> "buttonPress"
sig_out ->  "noteToPlay" | "rhythm" | "audioSample"
note -> "E4" | "G4" | "C4"
rhyth -> "eigthnote" | "halfnote" | "quarternote"
audio -> "HiHat" | "Snare" | "Kick"
