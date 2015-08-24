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
		oInputTargetDom.value = oSelectedDate.toInputString()
		oHeader.update()
	})

	oFooter.on( 'change', function ()
	{
		oInputTargetDom.value = oSelectedDate.toInputString()
		oHeader.update()
		oCalendar.update()
	})

	this.oDomElement.appendChild( oHeader.getDom() )
	this.oDomElement.appendChild( oCalendar.getDom() )
	this.oDomElement.appendChild( oFooter.getDom() )
}

DatePicker.prototype.getDom = function ()
{
	return this.oDomElement
}

module.exports = DatePicker
