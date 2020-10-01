const Booking = require('./../models/bookings.js');
const Service = require('./../models/services.js');
const mongoose = require('mongoose');
var seedDB     = require("./../seeds");

exports.getBookingForm = async (req, res) => {
  try {
 var id = mongoose.Types.ObjectId(req.params.id); 
  Service.findById(id ,function(err,foundService){
		if(err){
			console.log(err);
			res.redirect("/");
		}else{
			console.log(foundService.name);
			res.render('bookingform', {service:foundService});
		}
	});
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
  var id=mongoose.Types.ObjectId(req.params.id); 
  Service.findById(id).populate("bookings").exec(function(err,foundService){
	if(err){
			console.log(err);
		}else{ 
	res.render("bookings",{service:foundService});	 
		 }	 
	});	
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }	
}	  

exports.createBooking = async (req, res) => {
  try {
 var location=req.body.location;
	var price=req.body.price;
	var date=req.body.date;
	var time=req.body.time; 
	var description =req.body.description;
	var option=req.body.option;
	var id = mongoose.Types.ObjectId(req.params.id);
	Service.findById(id,function(err,foundService){
		if(err){
			console.log(err);
			res.redirect("/");
		}else{
			var name= foundService.name;
			var newBooking={name:name,location:location,price:price,date:date,option:option,description:description,time:time};
			
			Booking.create(newBooking,function(err,newlyCreatedBooking){
		if(err){
			console.log(err);
		}else{
			 newlyCreatedBooking.save();
             foundService.bookings.push(newlyCreatedBooking);
             foundService.save();
			 res.redirect("/home/"+id+"/bookings");
		}
	});
		}
	});
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
 var id = mongoose.Types.ObjectId(req.params.booking_id);
    //findByIdAndRemove
    Booking.findByIdAndRemove(id, function(err){
       if(err){
		   console.log(err);
           res.redirect("back");
       } else {
           res.redirect("back");
		   console.log("booking deleted");
       }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
}

exports.editBooking=async (req,res) =>{
try{
	var id = mongoose.Types.ObjectId(req.params.id);
	var bookingId=req.params.booking_id;
	 Service.findById(id).populate("bookings").exec(function(err,foundService){
		if(err){
			console.log(err);
			res.redirect("/");
		}else{
	Booking.findById(bookingId, function(err, foundBooking){
           if(err){
		    console.log(err);
            res.redirect("back");
            } else {
            res.render("editBooking", { booking: foundBooking,service:foundService,service_id:id});
           }
   });
		}
	 });
} catch(err){
  res.status(404).json({
      status: 'fail',
      message: "what the hell"
    });	
}}

exports.updateBooking = async(req,res) =>{
try{
	var id=mongoose.Types.ObjectId(req.params.id);
	var bookingId =mongoose.Types.ObjectId(req.params.booking_id);
	var location=req.body.location;
	var price=req.body.price;
	var date=req.body.date;
	var time=req.body.time; 
	var description =req.body.description;
	Service.findById(id,function(err,foundService){
	if(err){
		console.log(err);
	}	else{
		var name=foundService.name;
		var booking={name:name,location:location,price:price,date:date,description:description,time:time};
		Booking.findByIdAndUpdate(bookingId,booking,function(err, updatedBooking){
      if(err){
          res.redirect("back");
		  console.log(err);
      } else {
          res.redirect("/home/"+id+"/bookings" );
      }
   });	
	}
});

}catch(err){
  res.status(404).json({
      status: 'fail',
      message: 'yuppp its me'
    });		
}	
	
}