'use strict';

var mongoose = require('mongoose');
var async = require('async');
var TransientEvent = require('../models/transientEvent.model');

module.exports = {
    saveEvents: saveEvents,
    saveEvent: saveEvent
};

function saveEvents(events, callback) {
    //async.each(events, saveEvent, callback);

    var eventToSave = new TransientEvent(events[0]);

    eventToSave.save(function(error) {
        if (error) {
            console.log(error);
        }

        console.log('done');
    });

    //TransientEvent.create(events[0], function(error) {
    //    console.log('done');
    //});
}

function saveEvent(event, callback) {
    console.log(TransientEvent);


    var eventToSave = new TransientEvent(event);
    eventToSave.save(function(error, savedEvent) {
        if (error) {
            next(error);
        }
        console.log(savedEvent);
        callback(null);
    });

    //TransientEvent.create(event, callback);
    //var test = new TransientEvent(event);
}