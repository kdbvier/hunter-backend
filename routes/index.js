// server/routes/index.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const authRoutes = require('./authRouter');
// const photoRoutes = require('./photoRouter');

// Authentication routes
router.use('/auth', authRoutes);

// Photo upload routes
// router.use('/photos', passport.authenticate('jwt', { session: false }), photoRoutes);

module.exports = router;
