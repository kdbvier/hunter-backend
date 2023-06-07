const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  googleId: String,
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  address:String,
  phone: String,
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  avatar: String,
  about: String
});

// UserSchema.pre('save', async function(next) {
//   try {
//     if (!this.isModified('password')) {
//       return next();
//     }
//     const hashedPassword = await bcrypt.hash(this.password, 10);
//     this.password = hashedPassword;
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// UserSchema.methods.comparePasswords = async function(candidatePassword) {
//   try {
//     return await bcrypt.compare(candidatePassword, this.password);
//   } catch (err) {
//     throw new Error(err);
//   }
// };

const User = mongoose.model('User', UserSchema);

module.exports = User;
