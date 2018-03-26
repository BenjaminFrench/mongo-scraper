var Headline = require('../models/Headline');

exports.headlines_get = function (req, res) {
    Headline.find({})
    .then( dbHeadline => {
        res.json(dbHeadline);
    });
};

exports.headlines_get_html = function (req, res) {
    Headline.find({})
    .populate('notes')
    .then( dbHeadline => {
        var hbsObject = {
            headlines: dbHeadline
        };
        res.render("home", hbsObject);
    });
};