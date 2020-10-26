const express = require('express');
const homeController = require('./../controllers/homeController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').get(authController.hasCurrentUser,homeController.getAllServices);

router.route('/:id([0-9a-fA-F]{24})').get(authController.hasCurrentUser,homeController.getAllSubServices);
 
module.exports = router;