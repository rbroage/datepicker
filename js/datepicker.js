var Header   = require( './header' )
var Calendar = require( './calendar' )
var Footer   = require( './footer' )
var Date     = require( './improvedDate' )

var DatePicker = function ( oInputTargetDom )
{
	this.oDomElement = document.createElement( 'div' )
	this.oDomElement.className = 'datepicker'

	//this.oDataStorage = require( './datastorage' )

	var oSelectedDate = new Date('3000-12-24')

	var oHeader = new Header( oSelectedDate )
	var oCalendar = new Calendar( oSelectedDate )
	var oFooter = new Footer( oSelectedDate )

	oCalendar.on( 'select', function ()
	{
		this.changeValue( oInputTargetDom, oSelectedDate.toInputString() )
		oHeader.update()
	}.bind(this))

	oFooter.on( 'change', function ()
	{
		this.changeValue( oInputTargetDom, oSelectedDate.toInputString() )
		oHeader.update()
		oCalendar.update()
	}.bind(this))

	this.oDomElement.appendChild( oHeader.getDom() )
	this.oDomElement.appendChild( oCalendar.getDom() )
	this.oDomElement.appendChild( oFooter.getDom() )
}

DatePicker.prototype.changeValue = function( oInputTargetDom, oValue )
{
	oInputTargetDom.value = oValue

	if ( "createEvent" in document ) {
	    var oEvent = document.createEvent( "HTMLEvents" )
	    oEvent.initEvent( "change", false, true )
	    oInputTargetDom.dispatchEvent( oEvent )
	} else {
		 var evt = document.createEventObject()
		oInputTargetDom.fireEvent( "onchange", evt )
	}
}

DatePicker.prototype.getDom = function ()
{
	return this.oDomElement
}

module.exports = DatePicker
