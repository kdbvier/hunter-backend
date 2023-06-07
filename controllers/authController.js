const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport =  require('passport');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user with the same email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash password and create new user
    const saltRounds = 5;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user = new User({
      name,
      email,
      password: hashedPassword
    });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: req.body });
  }
};

exports.login = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials---email' });
    }
    
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials---password' });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.Profile = async (req, res) => {
  try {
    const { avatar, name, address, email, phone, about, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials---email' });
    }
    
    // Check if password is correct
    user.name = name;
    user.avatar = avatar;
    user.address = address;
    user.phone = phone;
    user.about = about;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    res.json('success');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.profileget = async (req, res) => {
  try {
    const userid = req.headers.userid;
    
    console.log(1)
    // Check if user exists
    const user = await User.findOne({ _id:userid });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials---email' });
    }
    
    // Check if password is correct
    
    res.json({user});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save();
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server logout' });
  }
};

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });



exports.googleAuthCallback = (req, res) => {
  res.redirect('/profile');
};