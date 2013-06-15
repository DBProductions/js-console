var shell = document.querySelector('#shell');
var lastCommands = [];
var commandCount = 0;
var inputPossible = true;
var commands = new Commands(shell);
var interpreter = new Interpreter(shell, commands);
/**
 * init shell
 */
window.onload = function() {
    shell.value = "";
    shell.value = ">";
    shell.selectionStart = 1;
    shell.focus();
};
/**
 * dirty hack to scroll textarea down all the time
 *
 * TODO: find a better solution
 */ 
setInterval(function() {
    shell.scrollTop = shell.scrollHeight;
}, 100);
/**
 * helper functions
 */
function insertAtCursor(myField, myValue) {
    // IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    // MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
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
shell.addEventListener('keydown', function(e) {
    if (!inputPossible) {
        e.preventDefault();
        return false;
    }
    /** 
     * left key
     */
    if (e.keyCode === 37) {
        var completeLength = shell.value.length;
        var currentPos = shell.selectionStart;
        var lines = shell.value.split("\n");
        if (lines[lines.length-1] === '>') {
            e.preventDefault();
            return false;
        } else if((lines[lines.length-1].length - (completeLength-currentPos)) === 1) {
            e.preventDefault();
            return false;
        }            	
    /**
     * up key
     */
    } else if (e.keyCode === 38) {
        e.preventDefault(); 
        if (lastCommands[commandCount]) {
            var lines = shell.value.split("\n");
            lines[lines.length-1] = '>' + lastCommands[commandCount];
            shell.value = lines.join("\n");
        }                
        if (commandCount > 0) commandCount--;
        return false;
    /**
     * down key
     */
    } else if (e.keyCode === 40) {
        e.preventDefault();
        if (commandCount < lastCommands.length) commandCount++;
        var lines = shell.value.split("\n");
        if (lastCommands[commandCount]) {
            lines[lines.length-1] = '>' + lastCommands[commandCount];	
        } else {
            lines[lines.length-1] = '>';
        }
        shell.value = lines.join("\n");
        return false;
    /**
     * enter key
     */
    } else if (e.keyCode === 13) {
        var lines = shell.value.split("\n");
        var commandStr = lines[lines.length-1].slice(1);                
        if (lines[lines.length-1] !== '' && commandStr !== '') {
            lastCommands.push(commandStr);
            commandCount = lastCommands.length - 1;
            inputPossible = false;
            interpreter.handleCommand(commandStr, function() {                
                inputPossible = true;
                var lines = shell.value.split("\n");
                if (lines[lines.length-1][0] === undefined) {
                    insertAtCursor(shell, '>');            
                }
            });            
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
        e.preventDefault();
        return false;
    }
    /** 
     * enter key
     */
    if (e.keyCode === 13) {
        insertAtCursor(shell, '>');
    }
    /** 
     * back key
     */
    if (e.keyCode === 8) {
        var lines = shell.value.split("\n");
        if (lines[lines.length-1] === '') {
            insertAtCursor(shell, '>');
        }
    }
}, true);