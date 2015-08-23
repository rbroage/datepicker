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

	this.oHeader = new Header( oSelectedDate )
	this.oCalendar = new Calendar( oSelectedDate )

	this.oCalendar.on( 'select', function ()
	{
		oInputTargetDom.value = oSelectedDate.toInputString()
		this.oHeader.update()
	}.bind( this ) )

	this.oFooter = new Footer( oSelectedDate )

	this.oFooter.on( 'change', function ()
	{
		oInputTargetDom.value = oSelectedDate.toInputString()
		this.oHeader.update()
	}.bind( this ) )

	this.oDomElement.appendChild( this.oHeader.getDom() )
	this.oDomElement.appendChild( this.oCalendar.getDom() )
	this.oDomElement.appendChild( this.oFooter.getDom() )
}

DatePicker.prototype.getDom = function ()
{
	return this.oDomElement
}

module.exports = DatePicker
