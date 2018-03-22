var Headline = require('../models/Headline');

exports.headlines_get = function (req, res) {
    Headline.find({})
    .then( dbHeadline => {
        res.json(dbHeadline);
    });
};