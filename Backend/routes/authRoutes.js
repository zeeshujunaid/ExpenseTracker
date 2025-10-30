const express = require('express');
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require('../controllers/authController');
// const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getUser', getUserInfo);

module.exports = router;
