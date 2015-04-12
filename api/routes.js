'use strict';

var express = require('express');
var router = express.Router();
var scraper = require('../scraper');
var moment = require('moment');
//var async = require('async');
var TransientEvent = require('../models/transientEvent.model');

router.get('/repopulate', function (req, res, next) {
    scraper.repopulate(req, res, next);
});

// smart-scrapes GDN for data since last updated date
router.get('/delta', function(req, res, next) {
    var date = req.body.date;
});

// gets all transient events
router.get('/transientevents', function(req, res, next) {
    TransientEvent
        .find()
        .exec(function(error, events) {
            if (error) {
                next(error);
            }
            res.status(200).send(JSON.stringify(events, null, '\t'));
    });
});

module.exports = router;
