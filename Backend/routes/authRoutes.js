const express = require('express');
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require('../controllers/authController');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/register',protect, registerUser);
router.post('/login',protect, loginUser);
router.get('/getUser',protect, getUserInfo);

module.exports = router;
