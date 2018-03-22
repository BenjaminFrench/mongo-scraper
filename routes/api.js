var express = require('express');
var router = express.Router();

// Require our controllers.
var headline_controller = require('../controllers/headline');
var note_controller = require('../controllers/note');
var fetch_controller = require('../controllers/fetch');

// get all headlines
router.get('/headlines', headline_controller.headlines_get);

// scrape data into DB
router.get('/scrape', fetch_controller.scrape_get);

module.exports = router;