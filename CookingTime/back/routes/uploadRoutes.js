const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController')

router.post('/images', uploadController.uploadImages)

module.exports = router;