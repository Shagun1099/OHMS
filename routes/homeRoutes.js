const express = require('express');
const homeController = require('./../controllers/homeController');

const router = express.Router();

router.route('/').get(homeController.getAllServices);

router.route('/:id([0-9a-fA-F]{24})').get(homeController.getAllSubServices);
 
module.exports = router;