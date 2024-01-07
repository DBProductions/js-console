/**
 * This is the description for the interpreter.
 *
 * @class Interpreter
 * @constructor
 * @param {Object} shell the textarea
 * @param {Object} commands Commands object
 */
function Interpreter(shell, commands) {
    this.shell = shell;
    this.commands = commands;
    /**
     * help method description. The method displays the commands
     *
     * @method help
     * @param {Function} cb Callback funtion
     */
    this.help = async function help(cb) { 
        let lines = this.shell.value;        
        for (let i in this.commands) {
            if (this.commands[i].name) {
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
    this.handleCommand = function handleCommand(command) {
        const commandArr = command.split(' ');
        command = commandArr[0];
        let args = null;
        if (commandArr.length > 1) {
            args = commandArr.slice(1); 
        }
        
        if (command === 'help') {
            this.help(function(response) {
                if (response) {
                    this.shell.value += "\n" + response;
                }             
            }, args);
        } else if (typeof this.commands[command] === 'function') {
            var that = this;
            this.commands[command](function(response) {
                if (response) {
                    that.shell.value += "\n" + response;
                }
            }, args);    
        } else {
            this.shell.value += "\n'" + command + "' not found, type help to list commands";
        }
    };
}

export {
    Interpreter
}
