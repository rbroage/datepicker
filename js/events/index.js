var Event = require( './event' )

var Events = function ()
{
	this.list = {}
}

/**
 * Declare an Event who can be trigger later
 *
 * @method	registerEvent
 * @param	{string}	sEventName		- the name of the event
 */
Events.prototype.registerEvent = function ( sEventName )
{
	this.list[ sEventName ] = new Event( sEventName )
}

/**
 * Declare several Events who can be trigger later
 *
 * @method	registerEvents
 * @param	{array}		aEventsNames	- array with names of each events
 */
Events.prototype.registerEvents = function ( aEventsNames )
{
	aEventsNames.forEach( this.registerEvent.bind( this ) )
}

/**
 * Trigger an event and dispatch to all EventListener to this event
 *
 * @method	dispatchEvent
 * @param	{string}	sEventName	- name of the event triggered
 * @param	{object}	oEventArgs	- args who are passed to the EventListener
 */
Events.prototype.dispatchEvent = function ( sEventName, oEventArgs )
{
	if ( oEventArgs == null ) {
		oEventArgs = { target: this }
	}
	if ( this.list[ sEventName ] == undefined ) {
		return console.error( 'No event "' + sEventName + '" is defined for this element.' )
	}
	this.list[ sEventName ].callbacks.forEach( function ( callback ) {
		return callback( oEventArgs )
	})
}

/**
 * Alias for addEventListener
 *
 * @method	on
 * @param	{string}	sEventName	- name of the event
 * @param	{Function}	callback	- callback called when the event is triggered
 */
Events.prototype.on =
/**
 * Add an EventListener on an event
 *
 * @method	addEventListener
 * @param	{string}	sEventName	- name of the event
 * @param	{Function}	callback	- callback called when the event is triggered
 */
Events.prototype.addEventListener = function ( sEventName, callback )
{
    if ( this.list[ sEventName ] != undefined ) {
        this.list[ sEventName ].registerCallback( callback )
    }
}

module.exports = Events
