
### This is a processing callback plugin.
Create a callback manager.

	var callbackManager = require("callback-manager").create();

Create a counter.

	callbackManager.create();

Add a receiver to callback.

	setTimeout(callbackManager.getReceiver(),100);

Add second receiver to callback.

	setTimeout(callbackManager.getReceiver(),150);
	
Process result when two callback is called.

	callbackManager.done( function(){ console.log("success"); });

### Run example
	node example/sample.js


