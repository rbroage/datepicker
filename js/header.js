var Events = require( './events' )

var Header = function ( oSelectedDate )
{
	// extends
	Events.call( this )

	this.oSelectedDate = oSelectedDate

	this.oDomElement = document.createElement( 'div' )
	this.oDomElement.className = 'datepicker_header'

	this.oDomElement.appendChild( this.createDayDisplay() )

	this.update()
}

Header.prototype = Object.create( Events.prototype )

Header.prototype.getDom = function ()
{
	return this.oDomElement
}

Header.prototype.createDayDisplay = function ()
{
	var oDom = document.createElement( 'div' )
	oDom.className = 'datepicker_daydisplay'
	var oDay = document.createElement( 'div' )
	oDay.className = 'day'

	oDom.appendChild( oDay )

	var oFullDay = document.createElement( 'div' )
	oFullDay.className = 'fullday'

	var oMonth = document.createElement( 'div' )
	oMonth.className = 'month'

	var oDate = document.createElement( 'div' )
	oDate.className = 'date'

	var oYear = document.createElement( 'div' )
	oYear.className = 'year'

	oFullDay.appendChild( oMonth )
	oFullDay.appendChild( oDate )
	oFullDay.appendChild( oYear )

	oDom.appendChild( oFullDay )

	this.aLabels = [ oDay, oMonth, oDate, oYear ]

	return oDom
}

Header.prototype.update = function ()
{
    if ( ! this.oSelectedDate.isEquals( '24', '11', '3000') ) {
    	// oDay
    	this.aLabels[ 0 ].innerHTML = this.oSelectedDate.toDayString()
    		// oMonth
    	this.aLabels[ 1 ].innerHTML = this.oSelectedDate.toMonthString().slice( 0, 3 )
    		// oDate
    	this.aLabels[ 2 ].innerHTML = this.oSelectedDate.getDate()
    		// oYear
    	this.aLabels[ 3 ].innerHTML = this.oSelectedDate.getFullYear()
    } else {
		this.aLabels[ 2 ].innerHTML = '...'
	}
}

module.exports = Header
