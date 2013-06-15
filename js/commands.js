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
 * do fake call with sinon
 */
function doCall(arg) {
    var callback = sinon.stub();
    callback.returns(5);
    callback.withArgs('1').returns(10);
    callback.withArgs('install').returns('start to install...finish');
    return callback(arg);
}