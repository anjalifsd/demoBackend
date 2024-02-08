const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1 hour',
    });
    res.json({ token,message: 'Registration successful' });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Use findOne to find a single user based on the email
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        console.log(password, user.password)

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
          expiresIn: '1 hour',
        });

        res.json({ token ,userId: user._id});
      } else {
        res.status(401).json({
          message: "Login not successful",
          error: "Incorrect password",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

module.exports = { register, login };
