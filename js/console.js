import { Commands } from './commands'
import { Interpreter } from './interpreter'

const shell = document.querySelector('#shell')
const lastCommands = []
let commandCount = 0
let inputPossible = true
const commands = new Commands(shell)
const interpreter = new Interpreter(shell, commands)

/**
 * init shell
 */
window.onload = () => {
    shell.value = "\n";
    shell.value = ">";
    shell.selectionStart = 1;
    shell.focus();
}

/**
 * hack to scroll textarea down all the time
 */
(function() {
    const requestAnimationFrame = window.requestAnimationFrame || 
                                  window.mozRequestAnimationFrame ||
                                  window.webkitRequestAnimationFrame || 
                                  window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
function setCursor() {
    shell.scrollTop = shell.scrollHeight
    requestAnimationFrame(setCursor)
} 
setCursor()

/**
 * helper functions
 */
function insertAtCursor(myField, myValue) {
    if (myField.selectionStart || myField.selectionStart === '0') {
        let startPos = myField.selectionStart
        let endPos = myField.selectionEnd
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
    } else {
        myField.value += myValue;                
    }
}

/**
 * handle key down
 * left - go left to attend to '>'
 * up - increment commandCount and display last commands
 * down - decrement commandCount and display last commands
 * enter - get command string, push it in lastCommands and set commandCount, pass command to interpreter
 */
shell.addEventListener('keydown', async function(e) {
    if (!inputPossible) {
        e.preventDefault()
        return false
    }
    var lines
    if (e.keyCode === 37) { // left key
        const completeLength = shell.value.length
        const currentPos = shell.selectionStart
        lines = shell.value.split('\n')
        if (lines[lines.length - 1] === '>') {
            e.preventDefault();
            return false;
        } else if ((lines[lines.length - 1].length - (completeLength - currentPos)) === 1) {
            e.preventDefault();
            return false;
        }
    } else if (e.keyCode === 38) { // up key
        e.preventDefault(); 
        if (lastCommands[commandCount]) {
            lines = shell.value.split("\n");
            lines[lines.length - 1] = '>' + lastCommands[commandCount];
            shell.value = lines.join("\n");
        }                
        if (commandCount > 0) {
            commandCount -= 1;
        }
        return false;
    } else if (e.keyCode === 40) { // down key
        e.preventDefault();
        if (commandCount < lastCommands.length) {
            commandCount += 1;
        }
        lines = shell.value.split("\n");
        if (lastCommands[commandCount]) {
            lines[lines.length - 1] = '>' + lastCommands[commandCount]; 
        } else {
            lines[lines.length - 1] = '>';
        }
        shell.value = lines.join("\n");
        return false;
    } else if (e.keyCode === 13) { // enter key
        lines = shell.value.split("\n");
        var commandStr = lines[lines.length - 1].slice(1);                
        if (lines[lines.length - 1] !== '' && commandStr !== '') {
            lastCommands.push(commandStr);
            commandCount = lastCommands.length - 1;
            inputPossible = false;
            interpreter.handleCommand(commandStr)
            inputPossible = true;
            var lines = shell.value.split("\n");                
            if (lines[lines.length - 1][0] === undefined) {
                insertAtCursor(shell, '>');            
            }           
        }
        return false;
    }
}, true);

/**
 * handle keyup
 * enter - insert '>' at the begin of line
 * back - insert '>' when deleted
 */
shell.addEventListener('keyup', function(e) {
    if (!inputPossible) {
        e.preventDefault()
        return false
    }
    if (e.keyCode === 13) { // enter key
        insertAtCursor(shell, '>')
    }
    if (e.keyCode === 8) { // back key
        const lines = shell.value.split('\n')
        if (lines[lines.length - 1] === '') {
            insertAtCursor(shell, '>')
        }
    }
}, true)
