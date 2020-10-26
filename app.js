var express              = require("express");
var app                  = express();
const AppError           = require('./utils/appError.js');
const globalErrorHandler = require('./controllers/errorController.js');
var Service              =require("./models/services.js");
var Booking              =require("./models/bookings.js");
var bodyParser           = require("body-parser");
//var seedDB             = require("./seeds");
const flash              = require("connect-flash");
var session              = require('express-session');
const dotenv             = require('dotenv');
const cookieParser       = require('cookie-parser');
var methodOverride       = require("method-override");
const homeRouter         = require('./routes/homeRoutes');
const bookingRouter      = require('./routes/bookingRoutes');
const userRouter         = require("./routes/userRoutes.js")
/*const rateLimit        = require('express-rate-limit');
const helmet             = require('helmet');
const mongoSanitize      = require('express-mongo-sanitize');
const xss                = require('xss-clean');
const hpp                = require('hpp'); */


dotenv.config({ path: './config.env' });

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
/*app.use(helmet());

// Limit requests from same API
 const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '100kb' })); 

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'price'
    ]
  })
);  */

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false	
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

//app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/media"));
app.use(flash());
app.use(session({ secret: "once again stiles being the hottest",
                  resave: false, 
                  saveUninitialized: false}));
app.use(cookieParser());
//seedDB();

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});
  
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
app.use('/', bookingRouter);
app.use('/',userRouter);

app.use(globalErrorHandler);

const server=app.listen(process.env.PORT, function() { 
  console.log('Server listening on port 3000'); 
  console.log("Ohms app has Started!!!!");	
});

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  console.log(err);	
  process.exit(1);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  console.log(err);	
  server.close(() => {
    process.exit(1);
  });
});



