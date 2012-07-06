
var callbackManagerFactory = require("../index");

//create a callback mananger.
var callbackManager = callbackManagerFactory.create();

var COUNTER_SUCESS = "success";

//create a callback counter
console.log( "create \"" + COUNTER_SUCESS + "\":" + callbackManager.create( COUNTER_SUCESS ));

//create a receiver
setTimeout(callbackManager.getReceiver( COUNTER_SUCESS ),500);

//create a receiver
setTimeout(callbackManager.getReceiver( COUNTER_SUCESS ),500);

//create a receiver and set a args name
(function( receiver ){

	var result = 5;

	setTimeout(function(){
		receiver( result );
	},1500);
		
})( callbackManager.getReceiver( COUNTER_SUCESS, "closure" ) );

//It will be executed when all of receivers called.
callbackManager.done( COUNTER_SUCESS, function( result ){
	console.log("[done1] do something!");
	for( var name in result ){
		for( var argName in result[name] ){
			console.log( "resultName:"+name + " argName:" + argName + " val:" + result[name][argName] );
		}
	}
	console.log( "done1!" );
});


setTimeout(function(){
	callbackManager.done( COUNTER_SUCESS, function( result ){
	console.log("[done2] do something!");
		console.log( "done2!" );
	});
},3000);
