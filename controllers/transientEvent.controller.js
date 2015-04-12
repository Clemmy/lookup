'use strict';

var mongoose = require('mongoose');
var async = require('async');
var TransientEvent = require('../models/transientEvent.model');

module.exports = {
    saveEvents: saveEvents,
    saveEvent: saveEvent
};

function saveEvents(events, callback) {
    async.each(events, saveEvent, callback);
}

function saveEvent(event, callback) {
    console.log(event);
    var eventToSave = new TransientEvent(event);
    eventToSave.save(function(error, savedEvent) {
        callback(error);
    });
}