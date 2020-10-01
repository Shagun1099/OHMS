const Service = require('./../models/services.js');
const mongoose = require('mongoose');


exports.getAllServices = async (req, res) => {
  try {
   Service.find({},function(err,allServices){
		if(err){
			console.log(err);
			res.redirect("/");
		}else{
	res.render("home",{services : allServices});
		}
	});
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getAllSubServices = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};