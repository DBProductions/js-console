/**
 * This is the description for the interpreter.
 *
 * @class Interpreter
 * @constructor
 * @param {Object} shell the textarea
 * @param {Object} commands Commands object
 */
function Interpreter(shell, commands) {
    "use strict";
    this.shell = shell;
    this.commands = commands;
    /**
     * help method description. The method displays the commands
     *
     * @method help
     * @param {Function} cb Callback funtion
     */
    this.help = function help(cb) {
        var i, lines = this.shell.value;
        for (i in this.commands) {
            if (typeof this.commands[i] === 'function') {
                lines += "\n" + this.commands[i].name;    
            }             
        }                
        this.shell.value = lines;
        cb();
    };
    /**
     * handleCommand method description. The method call the commands
     * seperate command from args
     * handle specific command 
     * - call when present and is from type function
     *
     * @method handleCommand
     * @param {String} command Command
     * @param {Function} cb Callback funtion
     */
    this.handleCommand = function handleCommand(command, cb) {
        var commandArr = command.split(' ');
        command = commandArr[0];
        var args = null;
        if (commandArr.length > 1) {
            args = commandArr.slice(1); 
        }
        
        if (command === 'help') {
            this.help(function(response) {
                if (response) {
                    this.shell.value += "\n" + response;
                }
                cb();                    
            }, args);
        } else if (typeof this.commands[command] === 'function') {
            var that = this;
            this.commands[command](function(response) {
                if (response) {
                    that.shell.value += "\n" + response;
                }
                cb();                    
            }, args);    
        } else {
            this.shell.value += "\n'" + command + "' not found, type help to list commands";
            cb();
        }
    };
}
