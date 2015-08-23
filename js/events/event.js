var Event = function ( sName )
{
	this.name = sName
	this.callbacks = []
}

Event.prototype.registerCallback = function ( callback )
{
	this.callbacks.push( callback )
}

module.exports = Event
