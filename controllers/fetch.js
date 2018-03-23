var Note = require('../models/Note');
var Headline = require('../models/Headline');

var cheerio = require('cheerio');
var request = require('request');

exports.scrape_get = function (req, res) {
    request('https://techcrunch.com', function (error, response, body) {
        var $ = cheerio.load(body);

        var results = [];
        // Now, we grab every h2 within an article tag, and do the following:
        $(".post-block").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this).find(".post-block__title__link").text().trim();

            result.url = $(this).find(".post-block__title__link").attr("href").trim();

            result.summary = $(this).find(".post-block__content").text().trim();

            results.push(result);
            
        });
        console.log(`Scraped ${results.length} articles.`);

        Headline.create(results)
        .then( dbHeadline => {
            console.log(`Added ${dbHeadline.length} articles to DB.`);
            res.status(201).end();
        })
        .catch( err => {
            res.status(500).end();
        });
    });
};