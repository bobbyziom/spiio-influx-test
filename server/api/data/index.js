'use strict';

var express 	= require('express'),
	controller 	= require('./data.controller'),
	router 		= express.Router();

router.get('/', controller.list);
router.get('/:id', controller.find);
router.post('/:id', controller.create);
router.delete('/:id/:time', controller.delete);

module.exports = router;