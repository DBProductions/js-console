/**
 * very simple interpreter
 */
function Interpreter(shell, commands) {
    this.shell = shell;
    this.commands = commands;
    /**
     * display defined commands
     */
    this.help = function help(cb) {
        var lines = this.shell.value;
        for(i in this.commands) {
            if (typeof this.commands[i] === 'function') {
                lines += "\n" + this.commands[i].name;    
            }             
        }                
        this.shell.value = lines;
        cb();
    };
    /**
     * seperate command from args
     * handle specific command 
     * - call when present and is from type function
     */
    this.handleCommand = function handleCommand(command, cb) {
        var commandArr = command.split(' ');
        var command = commandArr[0];
        var args = null;
        if (commandArr.length > 1) {
            args = commandArr.slice(1); 
        }
        
        if (command === 'help') {
            this.help(function (response) {
                if (response) {
                    this.shell.value += "\n" + response;
                }
                cb();                    
            }, args);
        } else if (typeof this.commands[command] === 'function') {
            this.commands[command](function (response) {
                if (response) {
                    this.shell.value += "\n" + response;
                }
                cb();                    
            }, args);    
        } else {
            this.shell.value += "\n'" + command + "' not found, type help to list commands";
            cb();
        }
    };
}