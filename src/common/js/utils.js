/**
 * 时间戳格式化
 * @param {*number} t 时间戳
 * 返回对象
 */
export default {
    formatTime(t, str) {
        var str = str || 'yy-mm-dd';
        var monthArr = ['JAN', 'Feb', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        var time = new Date(t);
        var y = time.getFullYear();
        var m = time.getMonth() + 1; // 返回0-11之间的整数，0：一月，1：二月...11：12月
        var d = time.getDate();
        var h = time.getHours();
        var mn = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
        var s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
        m = m < 10 ? '0' + m : m;
        if (/^y+-m+-d+$/.test(str)) {
            var t = y + '-' + m + '-' + d
        } else {
            var t = y + '-' + m + '-' + d + ' ' + h + ':' + mn + ':' + s;
        }
        var obj = {
            time: t,
            month: m,
            monthEng: monthArr[m - 1]
        }
        return t;
    }
}