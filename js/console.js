var shell = document.querySelector('#shell'),
    lastCommands = [], 
    commandCount = 0, 
    inputPossible = true,
    commands = new Commands(shell),
    interpreter = new Interpreter(shell, commands);
/**
 * init shell
 */
window.onload = function() {
    "use strict";
    shell.value = "\n";
    shell.value = ">";
    shell.selectionStart = 1;
    shell.focus();
};
/**
 * hack to scroll textarea down all the time
 */
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || 
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || 
                                window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
function setCursor() {
    "use strict";
    shell.scrollTop = shell.scrollHeight;
    requestAnimationFrame(setCursor);
} 
setCursor();
/**
 * helper functions
 */
function insertAtCursor(myField, myValue) {
    "use strict";
    // IE support
    if (document.selection) {
        myField.focus();
        var sel = document.selection.createRange();
        sel.text = myValue;    
    // MOZILLA and others
    } else if (myField.selectionStart || myField.selectionStart === '0') {
        var startPos = myField.selectionStart,
            endPos = myField.selectionEnd;
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
    "use strict";
    if (!inputPossible) {
        e.preventDefault();
        return false;
    }
    var lines;
    /** 
     * left key
     */
    if (e.keyCode === 37) {
        var completeLength = shell.value.length,
            currentPos = shell.selectionStart;
        lines = shell.value.split("\n");
        if (lines[lines.length - 1] === '>') {
            e.preventDefault();
            return false;
        } else if ((lines[lines.length - 1].length - (completeLength - currentPos)) === 1) {
            e.preventDefault();
            return false;
        }
    /**
     * up key
     */
    } else if (e.keyCode === 38) {
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
    /**
     * down key
     */
    } else if (e.keyCode === 40) {
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
    /**
     * enter key
     */
    } else if (e.keyCode === 13) {
        lines = shell.value.split("\n");
        var commandStr = lines[lines.length - 1].slice(1);                
        if (lines[lines.length - 1] !== '' && commandStr !== '') {
            lastCommands.push(commandStr);
            commandCount = lastCommands.length - 1;
            inputPossible = false;
            interpreter.handleCommand(commandStr, function() {                
                inputPossible = true;
                var lines = shell.value.split("\n");                
                if (lines[lines.length - 1][0] === undefined) {
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
    "use strict";
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
        if (lines[lines.length - 1] === '') {
            insertAtCursor(shell, '>');
        }
    }
}, true);
