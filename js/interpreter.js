/**
 * commands
 */
function Commands(shell) {
    this.shell = shell;
    /**
     * define callable functions with or without return values
     */
    this.rocks = function rocks(cb) {                
        cb('javascript rocks!!! 就是就是');
    }; 
    this.make = function make(cb, args) {
        if(args) {
            if (args[0] === '-help' || args[0] === '-h') {
                var helpStr = "\nmake is a test command\nit only display the given arguments and this text";
                this.shell.value += helpStr;
            } else {
                var content = this.shell.value;
                for(var i = 0; i < args.length; i++) { 
                    content += "\n" + i + ": " + args[i]; 
                }
                content += "\nreturn: " + doCall(args[0]);
                this.shell.value = content;                
            }
        } else {
            this.shell.value += "\nno arguments, type make -h or make -help";
        }
        cb(null);
    };
    this.timer = function timer(cb) {
        var count = 0;
        var inter = setInterval(function() {
            count += 1;
            if (count === 5) {
                clearInterval(inter);
            }
            this.shell.value += "step " + (20*count) + "%\n";
        }, 1000);
        setTimeout(function() {
            cb(null);
        }, 5010);        
    };
    this.install = function install(cb) {
        var lines = this.shell.value;
        for(var i = 0; i < 10000; i++) { lines += "\n" + '-- loading environment step: ' + i; }
        this.shell.value = lines;
        setTimeout(function() {
            cb(null);
        }, 1000);        
    };
    this.clear = function clear(cb) {
        this.shell.value = "";
        this.shell.value = ">";
        this.shell.selectionStart = 1;
        this.shell.focus();
        cb(null);
    };
}
/**
 * very simple interpreter
 */
function Interpreter(shell) {
    this.shell = shell;
    this.commands = new Commands(shell);
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
/**
 * do fake call with sinon
 */
function doCall(arg) {
    var callback = sinon.stub();
    callback.returns(5);
    callback.withArgs('1').returns(10);
    callback.withArgs('install').returns('start to install...finish');
    return callback(arg);
}