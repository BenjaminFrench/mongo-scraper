var Note = require('../models/Note');
var Headline = require('../models/Headline');

var cheerio = require('cheerio');
var request = require('request');

exports.scrape_get = function (req, res) {
    request('http://www.google.com', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });

    res.end();

};