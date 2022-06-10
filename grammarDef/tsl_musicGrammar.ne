formula ->
    "!" formula | formula "||" formula | formula "&&" formula |
    formula "U" formula | "G" formula | "F" formula | formula "->" formula
    | "[" sig_in "<-" fxnTerm "]"
sig_in -> "noteToPlay" | "rhythm"
fxnTerm ->  note | rhyth
note -> "E4" | "G4"
rhyth -> "eigthnote" | "halfnote"
