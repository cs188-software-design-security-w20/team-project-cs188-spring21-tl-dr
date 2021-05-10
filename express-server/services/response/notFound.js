'use strict';
var log = require('../logger');
var _ = require('lodash');

module.exports = function(){
    log.warn('Sending 404 response: '+'not found');
    var req = this.req;
    var res = this;

    // Dump it in the queue
    var response = {response: {status: 'error', message: 'not found'}};
    response.requestId = req.requestId;
    

    this.status(404).json({status: 'error', message: 'not found'});
};
