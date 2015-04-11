var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transientEventSchema = new Schema({
    ra: String,
    dec: Number,
    orbital_period: Number,
    MAXI_flux_change_prob: Number,
    MAXI_avg_flux_mCrab: Number,
    MAXI_data_date: Number,
    swift_avg_flux_change_prob: Number,
    swift_avg_flux_mCrab: Number,
    swift_data_date: Date,
    fermi_flux_change_prob: Number,
    fermi_average_pulsed_flux: Number,
    fermi_data_date: Date
});

module.exports = transientEventSchema;