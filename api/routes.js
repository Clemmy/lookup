var express = require('express');
var router = express.Router();
var scraper = require('../scraper');

router.get('/repopulate', function (req, res, next) {
    //drop database
    //scrape all
    //repopulate database
    scraper.repopulate(req, res, next);
});

// smart-scrapes GDN for data since last updated date
router.get('/delta', function(req, res, next) {
    var date = req.body.date;
});

router.get('/transientevent', function(req, res, next) {

});

module.exports = router;
