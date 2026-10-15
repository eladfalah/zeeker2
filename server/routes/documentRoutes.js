const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');


router.post('/', documentController.uploadDocuments);
router.get('/:id', documentController.getDocuments);

module.exports = router;
