var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HeadlineSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    summary: {
        type: String,
        unique: true
    },
    url: {
        type: String,
        unique: true
    },
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
});

var Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;
