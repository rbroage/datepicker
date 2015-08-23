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
