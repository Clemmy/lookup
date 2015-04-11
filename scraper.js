var request = require('request');
var cheerio = require('cheerio');

module.exports = {
    repopulate: repopulate
};

function repopulate(req, res, next) {
    var events = [];

    request('http://integral.esac.esa.int/bexrbmonitor/webpage_oneplot.php', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(html);

            $('tbody tr').each(function(rowIndex, row) {
                var eventData = {};
                eventData['name'] = $(row).find('td div#name_cell').html().trim();

                var columns = $(row).find('td div.formated_cell');
                eventData['ra'] = $(columns[1]).html().trim();
                eventData['dec'] = $(columns[2]).html().trim();
                eventData['orbital_period'] = $(columns[3]).html().trim();
                eventData['MAXI_flux_change_prob'] = $(row).find('td div.formated_cell span').html().trim();
                eventData['MAXI_avg_flux_mCrab'] = $(columns[5]).html().trim();
                eventData['MAXI_data_date'] = $(columns[6]).html().trim();
                eventData['swift_avg_flux_change_prob'] = $(row).find('td div.formated_cell span').html().trim();
                eventData['swift_avg_flux_mCrab'] = $(columns[8]).html().trim();
                eventData['swift_data_date'] = $(columns[9]).html().trim();
                eventData['fermi_flux_change_prob'] = $(columns[10]).html().trim();
                eventData['fermi_average_pulsed_flux'] = $(columns[11]).html().trim(); // in keV cm^-2 s^-1
                eventData['fermi_data_date'] = $(columns[12]).html().trim();

                events.push(eventData);
            });

            res.send('# of events saved: ');
        }
    });
}