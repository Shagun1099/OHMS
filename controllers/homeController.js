const Service = require('./../models/services.js');
const mongoose = require('mongoose');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


// TO GET ALL THE SERVICES ON THE HOME EPAGE
exports.getAllServices = catchAsync(async (req, res) => {
   Service.find({},function(err,allServices){
		if(err){
			console.log(err);
			res.redirect("/");
		}else{
	res.render("home",{services : allServices});
		}
	});
});

// TO GET ALL THE SUB-SERVICES OF A PARTICULAR SERVICE
exports.getAllSubServices = catchAsync(async (req, res) => {
  var id = mongoose.Types.ObjectId(req.params.id);
	 Service.findById(id).populate("services").exec(function(err,foundService){
		if(err){
			console.log(err);
			res.redirect("/");
		}else{
			console.log(foundService.name);
			res.render('subServices', {service:foundService});
		}
	});
});