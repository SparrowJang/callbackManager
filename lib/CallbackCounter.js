
/**
* @class
* @constructor
* @param {String} name
*/
function CallbackCounter( name ){
	this.name_ = name;
	this.count_ = 0;
	this.successCount_ = 0;
	this.successFuncs_ = [];
	this.isDone_ = false;
	this.result_ = {};
}

CallbackCounter.prototype = {
	/**
	* 
	*/
	increase:function(){
		this.count_++;
	},
	/**
	* @type Number
	*/
	getCount:function(){
		return this.count_;
	}
	,
	/**
	* @type String
	*/
	getName:function(){
		return this.name_;
	},
	/**
	* @param {String} resultName
	* @param {arguments} resultData
	*/
	trigger:function( resultName, resultData ){
		if( this.isDone_ )
			return ;

		this.successCount_++;

		if( resultName != undefined && resultName != "" )
			this.result_[ resultName ] = resultData;

		if( this.successCount_ == this.count_ ){
			this.isDone_ = true;
			this.onSuccess_();
		}
	},
	/**
	* @private
	*/
	onSuccess_:function(){
		for( var index in this.successFuncs_ ){
			var namespace = this.successFuncs_[ index ][ "namespace" ];
			this.successFuncs_[ index ][ "callback" ].call( namespace != null ? namespace : null , this.result_ );
		}
	},
	/**
	* @param {function} callback
	* @param {Object} namespace
	*/
	push:function( callback, namespace ){
		if( !this.isDone_ )
			this.successFuncs_.push({ callback:callback, namespace:namespace });
		else{
			callback.call( namespace != null? namespace : null, this.result_ );
		}
	}
};


module.exports = CallbackCounter;

