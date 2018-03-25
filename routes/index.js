var express = require('express');
var router = express.Router();

var headline_controller = require('../controllers/headline');

// GET home page.
router.get('/', headline_controller.headlines_get_html);

module.exports = router;
