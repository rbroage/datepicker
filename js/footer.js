var Events = require( './events' )

var Footer = function ( oSelectedDate )
{
	// extends
	Events.call( this )

	this.registerEvent( 'change' )

	this.oDomElement = document.createElement( 'div' )
	this.oDomElement.className = 'datepicker_footer'

	this.oDomElement.appendChild( this.createButton( 'today', function ()
		{
			oSelectedDate.resetDateToToday()
			this.dispatchEvent( 'change' )
		}.bind( this ) ) )
		//this.oDomElement.appendChild( this.createButton( 'clear' ) )
		// the event for closing is in "main" file
	this.oDomElement.appendChild( this.createButton( 'close' ) )
}

Footer.prototype = Object.create( Events.prototype )

Footer.prototype.getDom = function ()
{
	return this.oDomElement
}

Footer.prototype.createButton = function ( sLabel, fCallback )
{
	var oButton = document.createElement( 'button' )
	oButton.className = sLabel
	oButton.innerHTML = sLabel

	oButton.onclick = fCallback

	return oButton
}

module.exports = Footer
