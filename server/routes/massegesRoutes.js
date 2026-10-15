const express = require('express');
const router = express.Router();
const massegesController = require('../controllers/massegesController');


router.get('/:id', massegesController.getMassegesById);

module.exports = router;
