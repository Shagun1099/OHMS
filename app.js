var express    = require("express");
var app        = express();
const AppError = require('./utils/appError.js');
const globalErrorHandler = require('./controllers/errorController.js');
var Service    =require("./models/services.js");
var Booking    =require("./models/bookings.js");
var bodyParser = require("body-parser");
//var seedDB     = require("./seeds");
var methodOverride   = require("method-override");
const homeRouter = require('./routes/homeRoutes');
const bookingRouter = require('./routes/bookingRoutes');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ohms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false	
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/images"));
//seedDB();


app.get('/',function(req,res){
		res.render("landing");
});

app.get('/about',function(req,res){
	  Service.find({},function(err,allServices){
		if(err){
			console.log(err);
			res.redirect("/");
		}else{
	res.render("about",{services : allServices});
		}
	});  
});

/*app.get('/home',function(req,res){
	Service.find({},function(err,allServices){
		if(err){
			console.log(err);
			res.redirect("/");
		}else{
	res.render("home",{services : allServices});
		}
	});
});


app.get('/home/:id([0-9a-fA-F]{24})',function(req,res){
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

app.get('/home/:id([0-9a-fA-F]{24})/bookingform',function(req,res){
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
});


app.post('/home/:id([0-9a-fA-F]{24})/bookings',function(req,res){
	var location=req.body.location;
	var price=req.body.price;
	var date=req.body.date;
	var description =req.body.description;
	var option=req.body.option;
	var id = mongoose.Types.ObjectId(req.params.id);
	Service.findById(id).populate("services").exec(function(err,foundService){
		if(err){
			console.log(err);
			res.redirect("/");
		}else{
			var name= foundService.name;
			var newBooking={name:name,location:location,price:price,date:date,option:option,description:description};
			
			Booking.create(newBooking,function(err,newlyCreatedBooking){
		if(err){
			console.log(err);
		}else{
			res.redirect("/home/"+req.params.id+"/bookings");
		}
	});
		}
	});
    
});

app.get('/home/:id([0-9a-fA-F]{24})/bookings',function(req,res){
	Booking.find({},function(err,allBookings){
		if(err){
			console.log(err);
		}else{
	res.render("bookings",{bookings : allBookings});
		}
	});
});

app.delete('/home/:id([0-9a-fA-F]{24})/bookings', function(req, res){
	var id = mongoose.Types.ObjectId(req.params.id);
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
}); */



app.get('/login',function(req,res){
	    res.render("login");
});

app.get('/signup',function(req,res){
	    res.render("signup");
});

app.use('/home', homeRouter);
app.use('/home', bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
}); 

app.use(globalErrorHandler);

const server=app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
  console.log("Ohms app has Started!!!!");	
});

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

