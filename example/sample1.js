
var callbackManager = require("../index").create();

callbackManager.create();

setTimeout(callbackManager.getReceiver(),500);

setTimeout(callbackManager.getReceiver(),500);

callbackManager.done( function(){
	console.log("done!");
});

