const upper = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
const lower = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]

let charTypes = []
let isCharTypeSelected = []
let pwLentghEl = 4
let pwStructure = []
let pwQtEl = 2
let char = []
let pw = []
let loopN = 0
let pwEl = []
let randomPw = ""
let copiedMsg

let upperEl = document.getElementById("upper-el")
let lowerEl = document.getElementById("lower-el")
let numbersEl = document.getElementById("numbers-el")
let symbolsEl = document.getElementById("symbols-el")
var pwsDiv = document.getElementById("pws-div")

let mainEl = document.getElementById("main")
let pEl = document.getElementsByTagName("P")

function discardCharTypesNotSelected() {
    if (isCharTypeSelected[0] === false) {
        charTypes.shift()
    }
    if (isCharTypeSelected[1] === false) {
        charTypes.splice((charTypes.length - 3), 1)
    }
    if (isCharTypeSelected[2] === false) {
        charTypes.splice((charTypes.length - 2), 1)
    }
    if (isCharTypeSelected[3] === false) {
        charTypes.pop()
    }
}

function generatePwStructure() {
    for (let i = 0; i < pwLentghEl; i++) {
        pwStructure[i] = charTypes[Math.floor (Math.random() * charTypes.length)]
        // for each char of the pw randomly assign a type (array) of char
    }
}

function checkStructure() {
    // check if all of the types of chars selected were included in the pwStructure
    // if not, regenerate the pwStructure and check again
    for (let i = 0; i < charTypes.length; i++) {
        for (let j = 0; j < pwLentghEl; j++) {
            if (i < charTypes.length) {
                if (charTypes[i] === pwStructure[j]) {
                    i++
                    j = -1
                } else if (j === pwLentghEl - 1) {
                    generatePwStructure()
                    checkStructure()
                }
            }
        }
    }
} 

function assignPwChars() {
    randomPw = ""
    for (let i = 0; i < pwLentghEl; i++) {
        if (pwStructure[i] === upper) {
            char[i] = upper[Math.floor (Math.random() * upper.length)]
        } else if (pwStructure[i] === lower) {
            char[i] = lower[Math.floor (Math.random() * lower.length)]
        } else if (pwStructure[i] === numbers) {
            char[i] = numbers[Math.floor (Math.random() * numbers.length)]
        } else {
            char[i] = symbols[Math.floor (Math.random() * symbols.length)]
        }
        randomPw += char[i]
    }
    return randomPw
}

function comparePw() {
    for (let i = 1; i <= loopN; i++) {
        if (pw[loopN] === pw[loopN - i]) {
            pw[loopN] = assignPwChars()
            comparePw()
        }
    }
}

const copyToClipboard = function() {
    if (copiedMsg) {
        copiedMsg.remove()
    }
    navigator.clipboard.writeText(this.textContent)
    copiedMsg = document.createElement("p")
    this.after(copiedMsg)
    copiedMsg.setAttribute("class", "note")
    copiedMsg.textContent = "copiedMsg to clipboard"
}

function generatePasswords() {
    while (pwsDiv.firstChild) {
        pwsDiv.removeChild(pwsDiv.firstChild)
    }
    charTypes = [upper, lower, numbers, symbols]
    isCharTypeSelected = [upperEl.checked, lowerEl.checked, numbersEl.checked, symbolsEl.checked]
    if (isCharTypeSelected[0] || isCharTypeSelected[1] || isCharTypeSelected[2] || isCharTypeSelected[3]) {
        discardCharTypesNotSelected()
        pwLentghEl = document.getElementById("pw-length-el").value
        pwQtEl = document.getElementById("pw-qt-el").value
        copyEl = document.createElement("p")
        pwsDiv.append(copyEl)
        copyEl.setAttribute("class", "note")
        copyEl.textContent = "Click to copy"
        for (let i = 0; i < pwQtEl; i++) {
            generatePwStructure()
            checkStructure()
            pw[i] = assignPwChars()
            loopN = i
            comparePw()
            pwEl[i] = document.createElement("p")
            pwsDiv.append(pwEl[i])
            pwEl[i].setAttribute("class", "result")
            pwEl[i].setAttribute("id", "pw"+i+"-el")
            pwEl[i].textContent = pw[i]
            document.getElementById("pw"+i+"-el").onclick = copyToClipboard
        }
    } else {
        let errorEl = document.createElement("p")
        pwsDiv.append(errorEl)
        errorEl.setAttribute("id", "error-el")
        errorEl.textContent = "Please choose at least one type of character for your passwords"
    }
}