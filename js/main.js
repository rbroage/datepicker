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
		document.body.appendChild( oContainer )

		oInputTargetDom.onclick = function ()
		{
			oContainer.className += ' active'
		}
	},
}
