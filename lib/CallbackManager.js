
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
	*/
	DEFAULT_COUNTER_NAME_:"callback"+(+new Date()),
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
		if( counterName === undefined ){
			counterName = this.DEFAULT_COUNTER_NAME_;
		}

		if( !this.isExist( counterName ) ){

			this.add_( new CallbackCounter( counterName ) );
			return true;

		}

		return false;
	},
	/**
	* @param {String} counterName
	* @param {Object} opts 
	* @type function 
	*/
	getReceiver:function( counterName, opts ){
		var _ = this;

		if( typeof counterName === "object" || (counterName == undefined && opts == undefined )){
			opts = counterName;
			counterName = this.DEFAULT_COUNTER_NAME_;
		}

		if( !_.isExist( counterName ) )
			return ;

		var counter = _.get_( counterName );
		counter.increase();

		if( opts && opts.resultName )
			var resultName = opts && opts.resultName ? opts.resultName : null;

		return function(){
			counter.cancelDone();
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

		if( typeof counterName == "function" ){
			namespace = callback;
			callback = counterName;
			counterName = this.DEFAULT_COUNTER_NAME_;
		}


		if( _.isExist( counterName ) ){
			var counter = _.get_( counterName );
			counter.push( callback, namespace );
		}
	}
	
};

module.exports = CallbackManager;

