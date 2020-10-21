const Service = require('./../models/services.js');
const Booking = require('./../models/bookings.js');
const mongoose = require('mongoose');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


// TO GET THE BOOKING FORM
exports.getBookingForm = catchAsync(async (req, res,next) => {
 var id = mongoose.Types.ObjectId(req.params.id); 
  await Service.findById(id ,function(err,foundService){
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			console.log(foundService.name);
			res.render("bookingform", {service:foundService});
		}
	});
});

//TO GET ALL BOOKINGS
exports.getAllBookings = catchAsync(async (req, res,next) => {
  var id=mongoose.Types.ObjectId(req.params.id); 
  await Service.findById(id).populate("bookings").exec(function(err,foundService){
	if(err){
			console.log(err);
		    req.flash("error", err.message);
		    res.redirect("back");
		}else{ 
	res.render("bookings",{service:foundService});	 
		 }	 
	});	
});	  

//POST REQUEST TO CREATE A NEW BOOKING
exports.createBooking = catchAsync(async (req, res,next) => {
 var location=req.body.location;
	var price=req.body.price;
	var date=req.body.date;
	var time=req.body.time; 
	var description =req.body.description;
	var option=req.body.option;
	var id = mongoose.Types.ObjectId(req.params.id);
	await Service.findById(id,function(err,foundService){
		if(err){
			console.log(err);
			res.redirect("/");
		}else{
			var name= foundService.name;
			var newBooking={name:name,location:location,price:price,date:date,option:option,description:description,time:time};
			
		 Booking.create(newBooking,function(err,newlyCreatedBooking){
		if(err){
			req.flash("error", err.message);
			res.redirect("back");
			console.log(err);
		}else{
			 newlyCreatedBooking.save();
             foundService.bookings.push(newlyCreatedBooking);
             foundService.save();
			 req.flash("success", "Booking successfully Created");
			 res.redirect("/"+id+"/bookings");
		}
	});
		}
	});
});

//REQUEST TO DELETE A BOOKING
exports.deleteBooking = catchAsync(async (req, res,next)=>{
 var id = mongoose.Types.ObjectId(req.params.booking_id);
    //findByIdAndRemove
   await  Booking.findByIdAndRemove(id, function(err){
       if(err){
		   console.log(err);
           res.redirect("back");
       } else {
		   req.flash("success", "Booking successfully deleted");
           res.redirect("back");
		   console.log("booking deleted");
       }
    });
});

//TO SHOW THE EDIT BOOKING FORM
exports.editBooking=catchAsync(async (req,res) =>{
	var id = mongoose.Types.ObjectId(req.params.id);
	var bookingId=req.params.booking_id;
	await Service.findById(id).populate("bookings").exec(function(err,foundService){
		if(err){
			console.log(err);
			res.redirect("/");
		}else{
	 Booking.findById(bookingId, function(err, foundBooking){
           if(err){
		    console.log(err);
			req.flash("error", err.message); 
            res.redirect("back");
            } else {
            res.render("editBooking", { booking: foundBooking,service:foundService,service_id:id});
           }
   });
		}
	 }); 
});

// POST REQUEST FORM UPDATING A BOOKING
exports.updateBooking = catchAsync(async(req,res,next) =>{
	var id=mongoose.Types.ObjectId(req.params.id);
	var bookingId =mongoose.Types.ObjectId(req.params.booking_id);
	var location=req.body.location;
	var price=req.body.price;
	var date=req.body.date;
	var time=req.body.time; 
	var description =req.body.description;
	await Service.findById(id,function(err,foundService){
	if(err){
		console.log(err);
	}	else{
		var name=foundService.name;
		var booking={name:name,location:location,price:price,date:date,description:description,time:time};
	 Booking.findByIdAndUpdate(bookingId,booking,function(err, updatedBooking){
      if(err){
          res.redirect("back");
		  req.flash("error", err.message);
		  console.log(err);
      } else {
		   req.flash("success", "Booking successfully edited");
          res.redirect("/"+id+"/bookings" );
      }
   });	
	}
});
	
});