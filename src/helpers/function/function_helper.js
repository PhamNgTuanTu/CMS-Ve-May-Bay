import moment from "moment"
const titleCase = (str) => {
    var capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalizedStr
}

const formatDate = (datetime) => {
    return moment(new Date(datetime)).format('DD/MM/YYYY HH:mm')
}

const getDate = (datetime, format = "") => {
    var day, month, year, date = ''
    if (format != "") {  //Đưa về định dạng chuẩn
        day = getDay(datetime, format)
        month = getMonth(datetime, format)
        year = getYear(datetime, format)
        date = moment(new Date(year, month, day)).format('DD/MM/YYYY')
    } else {  //datetime đúng định dạng chuẩn
        date = moment(new Date(datetime)).format('DD/MM/YYYY')
    }
    return date
}

const getDay = (datetime, format = "") => {
    if (format != "") {
        return moment(datetime, format).date()
    } else {
        return moment(new Date(datetime)).date()
    }
}

const getMonth = (datetime, format = '') => {
    if (format != "") {
        return moment(datetime, format).month()
    } else {
        return moment(new Date(datetime)).month()
    }
}

const getYear = (datetime, format = '') => {
    if (format != "") {
        return moment(datetime, format).year()
    } else {
        return moment(new Date(datetime)).year()
    }
}

const getHours = (datetime, format = '') => {
    if (format != "") {
        return moment(datetime, format).format('HH:mm')
    } else {
        return moment(new Date(datetime)).format('HH:mm')
    }
}

const compareDate = (datetime1, datetime2, format) => {
    var message = '='
    var date1 = moment(datetime1, format).date()
    var month1 = moment(datetime1, format).month()
    var year1 = moment(datetime1, format).year()
    var date2 = moment(datetime2, format).date()
    var month2 = moment(datetime2, format).month()
    var year2 = moment(datetime2, format).year()
    var newDate1 = moment(new Date(year1, month1, date1)).format('YYYY-MM-DD')
    var newDate2 = moment(new Date(year2, month2, date2)).format('YYYY-MM-DD')
    newDate1 < newDate2 ? message = '<' : (newDate1 > newDate2 ? message = '>' : message = '=')
    return message
}

const validateSelect = (name, data, error, funcShowError) => {
    var invalid = false;
    if (data[name] === 0 || data[name] === "") {
        funcShowError(true)
        invalid = true
    }
    return invalid
}

const validateSelectNguoiLon = (name1, name2, data, funcShowError) => {
    var invalid = false;
    if (data[name2] > data[name1]) {
        funcShowError(true)
        invalid = true
    }
    return invalid
}

const validateTotalPerSon = (name1, name2, data, funcShowError) => {
    var invalid = false;
    if (data[name2] + data[name1] > 10) {
        funcShowError(true)
        invalid = true
    }
    return invalid
}

const validateDateTime = (name, error, funcShowError) => {
    var invalid = false;
    if (error[name] !== "") {
        funcShowError(true)
        invalid = true
    }
    return invalid
}

const updateNgayDiHople = (ngay_di, format, setParams) => {
    //update 00:00:00  ngày hôm sau
    var date = moment(ngay_di, format).date()
    var month = moment(ngay_di, format).month()
    var year = moment(ngay_di, format).year()
    var newDate = moment(new Date(year, month, date, 0, 0, 0)).format('DD-MM-YYYY HH:ss:mm')
    setParams(preState => ({ ...preState, ['ngay_di']: newDate }))
}

const sumValue = array => array.reduce((a, b) => a + b, 0)
const moneyFormat = (number, decimals, dec_point, thousands_sep) => {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

const getNameSeat = (name) => {
    var nameSeat = "";
    if (name !== "") {
        //cắt chuỗi với ký tữ -
        const arString = name.split('-');
        // lấy phần tử cuối 
        nameSeat = arString.slice(-1)[0];
    }
    return nameSeat;
}


export {
    titleCase, getDay, getMonth, getYear,
    formatDate, getDate, getHours, compareDate,
    validateSelect, validateDateTime, updateNgayDiHople,
    sumValue, moneyFormat, validateSelectNguoiLon, validateTotalPerSon, getNameSeat
}