(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Datepicker = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/reg/workspace/datepicker/js/calendar.js":[function(require,module,exports){
var Date = require( './improvedDate' )
var Events = require( './events' )

Calendar = function ( oSelectedDate )
{
	// extends
	Events.call( this )



	this.registerEvent( 'change' )
	this.registerEvent( 'select' )

	this.oDomElement = document.createElement( 'div' )
	this.oDomElement.className = 'datepicker_body'

	this.oSelectedDate = oSelectedDate

	this.oCalendarDate = new Date()



	this.oDomElement.appendChild( this.createControls() )

	this.oDomTableElement = document.createElement( 'div' )
	this.oDomElement.appendChild( this.oDomTableElement )

	this.update()
}

Calendar.prototype = Object.create( Events.prototype )

Calendar.prototype.getDom = function ()
{
	return this.oDomElement
}

Calendar.prototype.createArray = function ( iMonth, iYear )
{
	var sFormat = 'gregorian'

	var mn = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
	var dim = [ 31, ( new Date( iYear, 2, 0 ).getDate() ), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]

	var oDate = new Date( iYear, iMonth - 1, 1 ) //DD replaced line to fix date bug when current day is 31st
	var oDay = oDate.getDay()
	if ( sFormat == 'gregorian' )
	{
		oDay += 1
	}

	var aCalendar = []

	for ( i = 1; i <= 42; i++ )
	{
		if ( i - oDay < 0 )
		{
			// previous month
			var oPrevDate = new Date( iYear, iMonth - 2, dim[ iMonth - 2 ] - ( oDay - i ) + 1 )
			aCalendar.push(
			{
				month: iMonth - 1,
				monthLabel: mn[ iMonth - 2 ],
				value: oPrevDate.getDate(),
				selected: this.oSelectedDate.isEquals( i - oDay + 1, iMonth -2, iYear )
			} )
		}
		else if ( i - oDay < dim[ iMonth - 1 ] )
		{
			aCalendar.push(
			{
				month: iMonth,
				monthLabel: mn[ iMonth - 1 ],
				value: i - oDay + 1,
				selected: this.oSelectedDate.isEquals( i - oDay + 1, iMonth-1, iYear )
			} )
		}
		else
		{
			// next month
			aCalendar.push(
			{
				month: iMonth + 1,
				monthLabel: mn[ iMonth ],
				value: ( i - oDay ) - dim[ iMonth - 1 ] + 1,
				selected: this.oSelectedDate.isEquals( i - oDay + 1, iMonth, iYear )
			} )
		}

	}
	return aCalendar
}

Calendar.prototype.createControls = function ()
{
	var oControls = document.createElement( 'div' )
	oControls.className = 'datepicker_controls'

	oControls.appendChild( this.createMonthButton( 'prev', -1 ) )

	this.oLabelMonth = this.createLabelMonth()
	oControls.appendChild( this.oLabelMonth )

	this.oLabelYear = this.createLabelYear()
	oControls.appendChild( this.oLabelYear )

	oControls.appendChild( this.createMonthButton( 'next', 1 ) )

	return oControls
}

Calendar.prototype.createMonthButton = function ( sLabel, iValueOnChange )
{
	var oButton = document.createElement( 'div' )
	oButton.className = 'datepicker_nav ' + sLabel
	oButton.onclick = function ()
	{
		this.oCalendarDate.incrementMonth( iValueOnChange )
		this.dispatchEvent( 'change' )
		this.update()
	}.bind( this )
	return oButton
}

Calendar.prototype.createLabelMonth = function ()
{
	var oLabel = document.createElement( 'div' )
	oLabel.innerHTML = this.oCalendarDate.toMonthString()
	return oLabel
}

Calendar.prototype.createLabelYear = function ()
{
	var oLabel = document.createElement( 'select' )
	for (var i = -10; i < 10; i++) {
		var oOption = document.createElement( 'option' )
		oOption.value = oOption.innerHTML = this.oCalendarDate.getFullYear() + i
		oLabel.appendChild( oOption )
	}
	oLabel.value = this.oCalendarDate.getFullYear()
	oLabel.onchange = function( event ) {
		this.oCalendarDate.setFullYear( event.currentTarget.value )
		this.update()
	}.bind(this)
	return oLabel
}

Calendar.prototype.renderCalendar = function ( aCalendar )
{
	var iCurrentMonth = ( new Date() ).getMonth() + 1
	var iCurrentDate = ( new Date() ).getDate()
	var oTable = document.createElement( 'table' )

	oTable.innerHTML = '<tr><th title="Sunday">S</th><th title="Monday">M</th><th title="Tuesday">T</th><th title="Wednesday">W</th><th title="Thursday">T</th><th title="Friday">F</th><th title="Saturday">S</th></tr>'

	for ( var i = 0; i < 6; i++ )
	{
		var oLine = document.createElement( 'tr' )
		for ( var j = 0; j < 7; j++ )
		{
			oLine.appendChild(
				this.createCalendarCase( aCalendar[ ( i * 7 ) + j ], iCurrentDate, iCurrentMonth )
			)
		}
		oTable.appendChild( oLine )
	}
	return oTable
}

Calendar.prototype.createCalendarCase = function ( oData, iCurrentDate, iCurrentMonth )
{
	var oCase = document.createElement( 'td' )

	if ( oData.month == this.oCalendarDate.getMonth() + 1 )
	{
		var oDomData = document.createElement( 'div' )
		oDomData.innerHTML = oData.value
		oCase.appendChild( oDomData )

		if ( oData.selected == true ) {
			oCase.className += ' selected'
		}

		if ( oData.value == iCurrentDate && oData.month == iCurrentMonth )
		{
			oCase.className += ' today'
		}

		oCase.onclick = function ()
		{
			this.oSelectedDate.setDate( oData.value )
			this.oSelectedDate.setMonth( this.oCalendarDate.getMonth() )
			this.oSelectedDate.setFullYear( this.oCalendarDate.getFullYear() )

			this.dispatchEvent( 'select' )
			this.update()
		}.bind( this )
	}

	return oCase
}

Calendar.prototype.update = function ()
{

	this.oLabelMonth.innerHTML = this.oCalendarDate.toMonthString()
	//this.oLabelYear.innerHTML = this.oCalendarDate.getFullYear()

	this.oDomTableElement.innerHTML = ''
	this.oDomTableElement.appendChild(
		this.renderCalendar(
			this.createArray( this.oCalendarDate.getMonth() + 1, this.oCalendarDate.getFullYear() )
		)
	)
}

module.exports = Calendar

},{"./events":"/home/reg/workspace/datepicker/js/events/index.js","./improvedDate":"/home/reg/workspace/datepicker/js/improvedDate.js"}],"/home/reg/workspace/datepicker/js/datepicker.js":[function(require,module,exports){
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

},{"./calendar":"/home/reg/workspace/datepicker/js/calendar.js","./footer":"/home/reg/workspace/datepicker/js/footer.js","./header":"/home/reg/workspace/datepicker/js/header.js","./improvedDate":"/home/reg/workspace/datepicker/js/improvedDate.js"}],"/home/reg/workspace/datepicker/js/events/event.js":[function(require,module,exports){
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

},{}],"/home/reg/workspace/datepicker/js/events/index.js":[function(require,module,exports){
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

},{"./event":"/home/reg/workspace/datepicker/js/events/event.js"}],"/home/reg/workspace/datepicker/js/footer.js":[function(require,module,exports){
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

},{"./events":"/home/reg/workspace/datepicker/js/events/index.js"}],"/home/reg/workspace/datepicker/js/header.js":[function(require,module,exports){
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

},{"./events":"/home/reg/workspace/datepicker/js/events/index.js"}],"/home/reg/workspace/datepicker/js/improvedDate.js":[function(require,module,exports){
var aMonths = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
var aDays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]

Date.prototype.incrementMonth = function ( iIncrementValue )
{
	this.setMonth(
		this.getMonth() + iIncrementValue
	)
}

Date.prototype.toDayString = function ()
{
	return aDays[ this.getDay() ]
}

Date.prototype.toMonthString = function ()
{
	return aMonths[ this.getMonth() ]
}

Date.prototype.toInputString = function ()
{
	var sDay = ( "0" + this.getDate() ).slice( -2 )
	var sMonth = ( "0" + ( this.getMonth() + 1 ) ).slice( -2 )
	return this.getFullYear() + '-' + sMonth + '-' + sDay
}

Date.prototype.resetDateToToday = function ()
{
	var oToday = new Date()
	this.setDate( oToday.getDate() )
	this.setMonth( oToday.getMonth() )
	this.setFullYear( oToday.getFullYear() )
}

Date.prototype.isEquals = function ( iDate, iMonth, iYear )
{
    if ( this.getDate() == iDate && this.getMonth() == iMonth && this.getFullYear() == iYear ) {
        return true
    }
    return false
}

module.exports = Date

},{}],"/home/reg/workspace/datepicker/js/main.js":[function(require,module,exports){
var DatePicker = require( './datepicker' )

var getInput = function ( sIdInputTarget )
{
	if ( typeof sIdInputTarget == 'string' )
	{
		return document.getElementById( sIdInputTarget )
	}
	return sIdInputTarget
}

var isDateInputSupported = function ()
{
	var elem = document.createElement( 'input' )
	elem.setAttribute( 'type', 'date' )
	elem.value = 'foo'
	return ( elem.type == 'date' && elem.value != 'foo' )
}

module.exports = {

	load: function ( sIdInputTarget, bForce )
	{
		// if ( bForce != true && isDateInputSupported() )
		// {
		// 	return
		// }

		if ( sIdInputTarget == undefined )
		{
			console.error( 'the id or the dom element of the input is required.' )
			return
		}

		var oInputTargetDom = getInput( sIdInputTarget )
        oInputTargetDom.setAttribute( 'readonly' , 'true')

		var oDatePicker = new DatePicker( oInputTargetDom )

		var oContainer = document.createElement( 'div' )
		oContainer.className = 'datepicker_container'

		oContainer.onclick = function ( event )
		{
			if ( event.target == oContainer || event.target.className == 'close' )
			{
				oContainer.className = 'datepicker_container'
			}
		}
		oContainer.appendChild( oDatePicker.getDom() )

		oInputTargetDom.parentNode.insertBefore( oContainer, oInputTargetDom )
		//document.body.appendChild( oContainer )

		oInputTargetDom.onclick = function ()
		{
			oContainer.className += ' active'
		}
	},
}

},{"./datepicker":"/home/reg/workspace/datepicker/js/datepicker.js"}]},{},["/home/reg/workspace/datepicker/js/main.js"])("/home/reg/workspace/datepicker/js/main.js")
});