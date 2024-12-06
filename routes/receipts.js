const express = require('express');
const router = express.Router();
const { processReceipt } = require('../controllers/receiptsController');

router.post('/process', processReceipt);

module.exports = router;