var mongoose = require("mongoose");


// schema setup
var servicesSchema = new mongoose.Schema({
	name:{
		type:String,
		required:[true,'a service must have a name']
	},
	sId:String,
	icon:String,
	image:String,
	subServices:[{
		name:String,
		image:String,
		price:Number
	}],
	shortDescription:String,
	description:String,
	bookings:[
		{
		type:mongoose.Schema.Types.ObjectId,
	    ref: "Booking"
	}
  ]
});

module.exports = mongoose.model("Service",servicesSchema);
