formula ->
    "!" formula | formula "||" formula | formula "&&" formula |
    formula "U" formula | "G" formula | "F" formula | formula "=>" formula |
    "[" sig_in "<-" fxnTerm "]"
fxnTerm -> "E4" | "G4"
sig_in -> "noteToPlay"