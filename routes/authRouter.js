// server/routes/auth.js

const express = require('express');
const router = express.Router();
const passport = require('passport');


const AuthController = require('../controllers/authController');


router.get('/auth/google', AuthController.googleAuth);
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), AuthController.googleAuthCallback);
router.post('/register', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.post('/profile', AuthController.Profile);
router.get('/profile', AuthController.profileget);

  
module.exports = router;
