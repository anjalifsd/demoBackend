const express = require('express');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();

router.get('/profile', authenticate, (req, res) => {
  const { username, isNewUser } = req.user;
  const { _id } = req.user;
  res.json({ username, _id, isNewUser });
});

module.exports = router;
