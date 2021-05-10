"use strict";
var express = require('express');
var router = express.Router();
var validator = require('../services/validator');
var textsController = require('../controllers/Texts');

var service = 'texts';

// get texts or search texts
router.get('/'+service, textsController.find);


// get text
router.get('/'+service+'/:id', textsController.findOne);

// To add validation, add a middlewave like the below. Works for just POST calls only
// function(req,res,next){
//     req._required = [ // _required should contain all the fails that are required
//     'name',
//     'name2'
//     ];

//     next();
// }, validator,

router.post('/summarizeByURL', textsController.summarizeByURL);

router.post('/summarize', textsController.summarizeByText);

// create text(s) a single text object will create one text while an array of texts will create multiple texts
router.post('/'+service, textsController.create);

// update all records that matches the query
router.put('/'+service, textsController.update);

// update a single record
router.patch('/'+service+'/:id', textsController.updateOne);

// delete all records that matches the query
router.delete('/'+service, textsController.delete);

// Delete a single record
router.delete('/'+service+'/:id', textsController.deleteOne);

// restore a previously deleted record
router.post('/'+service+'/:id/restore', textsController.restore);

module.exports = router;
