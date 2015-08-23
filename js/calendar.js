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
