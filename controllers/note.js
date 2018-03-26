var Note = require('../models/Note');
var Headline = require('../models/Headline');

exports.note_post = function (req, res) {
    // Create a new note and pass the req.body to the entry
    Note.create(req.body)
        .then(function (dbNote) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            console.log('Created note')
            return Headline.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: dbNote._id }}, { new: true });
        })
        .then(function (dbHeadline) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbHeadline);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
};