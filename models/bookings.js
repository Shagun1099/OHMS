var mongoose = require("mongoose");

var bookingsSchema = new mongoose.Schema({
	
	name:{
		type:String,
		trim:true
	 },
	location:{
	     type:String,
		required:[true,'A booking must have a location'],
		trim:true
    } ,
	price:{
		type:String,
		required:[true,'A booking must have a price limit'],
		trim:true,
	    minlength: [3, 'A booking price must have more or equal then 3 digits']
	},
	option:{
		type:String
	},
	date:{
		type:Date,
		required:[true,'A booking must have a date'],
	},
	bookingCreatedAt:{
	    type:Date,
		default:Date.now()
    },
	time:{
		type:String,
		required:[true,'A booking must have a time'],
	},
	description:{
	   type:String,
		required:[true,'A booking must have a description']
   },
	creator: {
		id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: String
	}
	
});

module.exports = mongoose.model("Booking",bookingsSchema);

