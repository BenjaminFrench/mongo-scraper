var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HeadlineSchema = new Schema({
    name: {
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
