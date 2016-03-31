/**
 * Convert some date to the format for ISO Date "yyyy-mm-ddThh:mm:ss.sssZ"
 * @param {Date} someDate - Any format of Date
 * @return {string} finalDate - Date converted
 */
var convertTime=  function(someDate)
{
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var h = someDate.getHours();
    var m = someDate.getMinutes();
    var s = someDate.getSeconds();
    var mmm = someDate.getMilliseconds();

    if(dd<10){dd = '0' + dd;}
    if(mm<10){mm = '0' + mm;}
    if(h<10){h = '0' + h;}
    if(m<10){m = '0' + m;}
    var finalDate =y + '-'+ mm + '-'+ dd + 'T' + h + ':' + m  + ':' + s + '.' + mmm + 'Z';
    return finalDate;
};

exports.convertTime = convertTime;