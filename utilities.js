'use strict';

module.exports = {
    formatDate: formatDate
};

function formatDate(dateText) {
    var year = (new Date()).getFullYear(); // current year
    var split = dateText.split(' ');
    var month = split[0];
    var day = split[1].substring(0, split[1].length-2);

    return month + ' ' + day + ' ' + year;
}