/**
 * do fake call with sinon
 */
function doCall(arg) {
    "use strict";
    var callback = sinon.stub();
    callback.returns(5);
    callback.withArgs('1').returns(10);
    callback.withArgs('js').returns('js rocks');
    callback.withArgs('install').returns('start to install...finish');
    return callback(arg);
}
/**
 * This is the description for the commands.
 * Commands are to write for your application to fit your needs.
 *
 * @class Commands
 * @constructor
 * @param {Object} shell the textarea
 */
function Commands(shell) {
    "use strict";
    this.shell = shell;
    /**
     * The method simulate rocks
     *
     * @method rocks
     * @param {Function} cb Callback funtion
     */
    this.rocks = function rocks(cb) {                
        cb('javascript rocks!!! 就是就是');
    };
    /**
     * The method simulate an make
     *
     * @method make
     * @param {Function} cb Callback funtion
     * @param {Array} args Arguments
     */ 
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
    /**
     * The method simulate an timer
     *
     * @method timer
     * @param {Function} cb Callback funtion
     */
    this.timer = function timer(cb) {
        var count = 0;
        var inter = setInterval(function() {
            count += 1;
            if (count === 5) {
                clearInterval(inter);
                setTimeout(function() {
                    cb(null);
                }, 10);
            }
            this.shell.value += "step " + (20*count) + "%\n";
        }, 1000);        
    };
    /**
     * The method simulate an installation
     *
     * @method install
     * @param {Function} cb Callback funtion
     */
    this.install = function install(cb) {
        var lines = this.shell.value;
        for(var i = 0; i < 10000; i++) { lines += "\n" + '-- loading environment step: ' + i; }
        this.shell.value = lines;
        setTimeout(function() {
            cb(null);
        }, 1000);        
    };
    /**
     * The method clear the textarea
     *
     * @method clear
     * @param {Function} cb Callback funtion
     */
    this.clear = function clear(cb) {        
        this.shell.selectionStart = 0;
        this.shell.focus();
        cb(null);
    };
}