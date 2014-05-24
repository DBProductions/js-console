#js-console

Use a HTML textarea tag to act as a console with a simple interpreter.  
Call gets simulated with Sinon could be AJAX or Websocket communication with a server.  

#####console.js  
Defines the event handler and pass the command to the interpreter.  

#####interpreter.js  
Hold the commands, display commands or handle command when gets called.  

#####commands.js  
Define the commands which get executed from the interpreter.  