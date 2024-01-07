# js-console

Use a HTML textarea tag to act as a console with a simple interpreter.  
Call gets simulated with Sinon could be AJAX or Websocket communication with a server.  

    npm i 
    npm run build

### console.js  
Defines the event handler and pass the command to the interpreter.  

### interpreter.js  
Hold the commands, display commands or handle command when gets called.  

### commands.js  
Define the commands which get executed from the interpreter.  

## Feedback
Star this repo if you found it useful. Use the github issue tracker to give feedback on this repo.