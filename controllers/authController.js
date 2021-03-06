const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');
//const sendEmail = require('./../utils/email');


const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

 /* res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    } 
  }); */
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)             
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`media/user/${req.file.filename}`);

  next();
});

exports.signup = catchAsync(async (req, res, next) => {
	var name= req.body.name,
        email= req.body.email,
	    phone=req.body.phone,	
		role=req.body.role,
        password= req.body.password,
        passwordConfirm=req.body.passwordConfirm;
  const newUser= {name:name,email:email,phone:phone,role:role,password:password,passwordConfirm:passwordConfirm};
  await User.create(newUser,function(err,newlyCreatedUser){
	  if(err){
		  console.log(err);
		  req.flash("error", err.message);
          res.redirect("back");
	  }
	 else{
		createSendToken(newlyCreatedUser, 201, res);
		console.log("A new user signed in:"); 
		console.log(newlyCreatedUser);
		req.flash("success", "Your account is successfully created");
		res.redirect("/"+newlyCreatedUser._id+"/profile") 
	 } 
  }); 
});

exports.userProfile=catchAsync(async(req,res,next)=>{
	 var id=mongoose.Types.ObjectId(req.params.id); 
	const {currentUser} = res.locals;
	if (!currentUser) {
            res.redirect('/back');
		    req.flash('error',"user belongs to this id do not exist");	
		     }
	await User.findById(id).populate('bookings').exec(function(err,foundUser){
	if(err){
		console.log(err);
		req.flash("error", err.message);
		res.redirect("back");
	}
		else{
			res.render("profile",{user:foundUser,currentUser:currentUser});
		}
								
	});
});
exports.login = catchAsync(async (req, res, next) => {
 const {email,password}	=req.body;
  // 1) Check if email and password exist
  if (!email || !password) {
    req.flash("error", err.message);
	 res.redirect("back"); 
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  await User.findOne({email}).select('+password').exec(function(err,foundUser){
	if(err){
		console.log(err);
		req.flash("error", err.message);
		res.redirect("back");
	} else{
		if (!foundUser || !(foundUser.correctPassword(password, foundUser.password))) {
        req.flash("error","Incorrect Email or Password ,Try Again!!");
		res.redirect("back");}
		else{ // 3) If everything ok, send token to client
		createSendToken(foundUser, 200, res);	
		console.log("Someone logged in:")	
		console.log(foundUser);		
		req.flash("success", " successfully logged in");
		res.redirect("/"+foundUser._id+"/profile"); 
		}		
	}		
}); 
 });

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
 req.flash("success","successfully logged out");
 console.log("Someone logged out");	
 res.redirect("/login");
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        req.flash("error","You need to be logged in to do that");
		res.redirect("/login");
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        req.flash("error","It seems like you have changed your password recently. You need to login again!!");
		res.redirect("/login");
      }

      // THERE IS A LOGGED IN USER
      res.locals.currentUser = currentUser;
      return next();
    } catch (err) {
     req.flash("error","You need to be logged in to do that");
	 res.redirect("/login"); 
    }
  }
 else{
	req.flash("error","You need to be logged in to do that");
	res.redirect("/login"); 
 }
};

exports.hasCurrentUser =  async (req, res, next) => {
  if (req.cookies.jwt) {
	 try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.currentUser = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  else{
	return next();
 }
}



/*exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
}); */
exports.providerDataForm=catchAsync(async(req,res,next)=>{
	 var id = mongoose.Types.ObjectId(req.params.id);
	User.findById(id,function(err,foundUser){
		if(err){
			console.log(err);
			res.redirect("/");
		}else{
			res.render("addProviderData", { user_id:foundUser._id});
		}
	});
});	

exports.addProviderData = catchAsync(async(req,res,next)=>{
	 var id = mongoose.Types.ObjectId(req.params.id);
	 var location=req.body.location;
	 var workExperience=req.body.workExperience;
	 var profession=req.body.profession;
	 var description=req.body.description;
	 var user={location:location,workExperience:workExperience,profession:profession,description:description};
	await User.findByIdAndUpdate(id,user,function(err,updatedUser){
		if(err){
		  res.redirect("back");
		  req.flash("error", err.message);
		  console.log(err);
		}else{
		  console.log(updatedUser);	
		  req.flash("success", "UPDATED INFORMATION SUCCESSFULLY");
          res.redirect("/"+id+"/profile" );
		}
	})
	 	 
	
	
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
}); 

exports.deleteUser = catchAsync(async (req, res, next) => {
  var id = mongoose.Types.ObjectId(req.params.id);
   res.cookie('jwt', 'AccountDeleted', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });	
  await  User.findByIdAndRemove(id, function(err){
       if(err){
		   console.log(err);
           res.redirect("back");
       } else {
		   req.flash("success", "User successfully removed");
           res.redirect("/login");
		   console.log("User Removed from database");
       }
    });
});  

