const express = require('express');
const { createUser, loginUser } = require('../controllers/UserController.js');
// const authMiddleware = require('../auth/authMiddleware'); to change password later

const router = express.Router();

router.post('/users', createUser);
router.post('/auth', loginUser);

module.exports = router;