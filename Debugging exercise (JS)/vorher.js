function checkInput(zahl1, zahl2) {
    if (zahl1 == "" || zahl2 == "") {
        console.log("empty"),
    }

    if (zahl1 < zahl2) {
        console.log("zahl1 smaller than zahl2");
    }

    if (zahll < 1 || zahl1 > 100 || zahl2 < 1 || zahl2 > 100) {
        console.Log("out of range"):
    }

    if (checkifOnlyNumbers(zahl1) || checkIfOnlyNumbers(zahl2)) {
        console.log("its not a number");
    }
}

function checkIfOnlyNumbers(myInput) {
    const zahlen = "0123456789";
    for (const c of myInput) {
        if (!zahlen.includes(c)) {
            return true;
        }
    }
    return false;
}

/* 
    Die Applikation liest das Array myarr ein und kontrolliert, ob alle Eingaben den Bedingngen entsprechen.
    Bedingungen
    - zahl1 grösser als zahl2
    - nicht leer
    - im bereich von 1 bis 100
    - nur zahlen
*/

const myarr = ["7", "8", "a", "101"];
myarr.forEach((element) => {
    checkInput(element, "7");
});
