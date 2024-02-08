const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  try {
    // Check if the password is modified
    if (!this.isModified('password')) {
      return next();
    }

    this.password = this.password;

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = function (candidatePassword) {
  try {
    const isMatch = candidatePassword === this.password;
    console.log('Password Match:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error; // rethrow the error for better error handling
  }
};


const User = mongoose.model('User', userSchema);

module.exports = User;
