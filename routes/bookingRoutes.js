const express = require('express');
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');


const router = express.Router();

router
.route('/:id/bookingform')
.get(bookingController.getBookingForm);

router
.route('/:id([0-9a-fA-F]{24})/bookings')
.get(authController.isLoggedIn,bookingController.getAllBookings)
.post(authController.isLoggedIn,bookingController.createBooking);

router
.route('/:id/bookings/:booking_id')	
.delete(bookingController.deleteBooking)
.put(bookingController.updateBooking);

router
.route('/:id/bookings/:booking_id/edit')
.get(bookingController.editBooking);
 
module.exports = router;