
var CallbackCounter = require("./CallbackCounter");

/**
* @class
* @constructor
*/
function CallbackManager(){
	this.counters_ = {};
}

CallbackManager.prototype = {
	/**
	* @param {Strimg} counterName
	* @type boolean
	*/
	isExist:function( counterName ){
		if( this.counters_[counterName] )
			return true;
		else
			return false;
	},
	/**
	* @private
	* @param {CallbackCounter} counter
	*/
	add_:function( counter ){
		this.counters_[ counter.getName() ] = counter;
	},
	/**
	* @private
	* @param {String} counterName
	* @type CallbackCounter
	*/
	get_:function( counterName ){
		return this.counters_[ counterName ];
	},
	/**
	* @private
	* @param {String} counterName
	*/
	remove_:function( counterName ){
		if( this.isExist( counterName ) ){
			delete this.counters_[ counterName ];
		}
	},
	/**
	* @param {String} counterName
	* @type boolean
	*/
	create:function( counterName ){
		if( !this.isExist( counterName ) ){
			this.add_( new CallbackCounter( counterName ) );
			return true;
		}

		return false;
	},
	/**
	* @param {String} counterName
	* @param {String} resultName
	* @type function 
	*/
	getReceiver:function( counterName, resultName ){
		var _ = this;

		if( !_.isExist( counterName ) )
			return ;

		var counter = _.get_( counterName );
		counter.increase();

		return function(){
			counter.trigger( resultName, arguments );
		};
	},
	/**
	* @param {String} counterName
	* @param {function} callback
	* @param {Object} namespace
	*/
	done:function( counterName, callback, namespace ){
		var _ = this;
		if( _.isExist( counterName ) ){
			var counter = _.get_( counterName );
			counter.push( callback, namespace );
		}
	}
	
};

module.exports = CallbackManager;

