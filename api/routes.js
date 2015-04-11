var express = require('express');
var router = express.Router();
var scraper = require('../scraper');

router.get('/repopulate', function (req, res, next) {
    //drop database
    //scrape all
    //repopulate database
    
    scraper.sayHi();
    res.send('success');
});

// smart-scrapes GDN for data since last updated date
router.get('/fetch', function(req, res, next) {
   var date = req.body.date;
});

module.exports = router;
