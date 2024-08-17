const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')


router.post('/login', userController.logIn)
router.post('/signin', userController.createUser)


module.exports = router