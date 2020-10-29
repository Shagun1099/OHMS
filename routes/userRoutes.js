const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup',  
  authController.uploadUserPhoto,
  authController.resizeUserPhoto,
  authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.isLoggedIn,authController.logout);

router.get('/:id/addProviderData',authController.providerDataForm);

router
.route('/:id/profile')
.get(authController.isLoggedIn,authController.userProfile)
.delete(authController.isLoggedIn,authController.deleteUser)
.put(authController.addProviderData);



/*router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.patch('/updateMe', authController.protect, authController.updateMe);
router.delete('/deleteMe', authController.protect, authController.deleteMe);

router
  .route('/')
  .get(authController.getAllUsers)
  .post(authController.createUser);

router
  .route('/:id')
  .get(authController.getUser)
  .patch(authController.updateUser)
  .delete(authController.deleteUser);*/

module.exports = router; 
