'use strict';

var express 	= require('express'),
	controller 	= require('./data.controller'),
	router 		= express.Router();

router.get('/', controller.list);
router.get('/:id', controller.find);
router.post('/:id', controller.create);
router.get('/copy/:id', controller.copy);
router.get('/copy', controller.copyAll);
router.get('/old/:id', controller.old);
router.delete('/:id/:time', controller.delete);

module.exports = router;