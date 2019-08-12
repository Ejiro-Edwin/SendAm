const express = require('express');
const dotenv = require('dotenv');
const userController = require('../controllers/UsersController');

dotenv.config();

let router = express.Router();
router.use(express.json());

router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;