// here lets make a Schema(model)
// new need to require mongoose
const mongoose = require("mongoose");
// create a instance of mongoose schema
// pass the model in the method
const mySchema = new mongoose.Schema({

    shortId:{
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl:{
        type: String,
        required: true,
    },
    numberOfClicks: [{
        timeStamps:{
            type: Number
        }
    }],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
},{timestamps: true});

const URLS = mongoose.model("URLS", mySchema);

module.exports = URLS;