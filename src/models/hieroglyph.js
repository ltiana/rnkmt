const  mongoose = require('mongoose');

// OBS! to make a nested object required, use a single nested schema


//TODO - what propertes should be included for a file, what are the allowed value type / values for each property?)

const dataFileSchema = new mongoose.Schema({
    file: {
        type: Buffer,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    fileSize: Number,
    fileType: String

});

const DataFile = mongoose.model("DataFile", dataFileSchema);

// TODO: change the type of file to dataFileSchema 
const hieroglyphSchema = new mongoose.Schema({
    file: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    gardiner: {
        type: String,
        required: true
    },
    groupname: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    notes: {
        type: String
    }
});


const Hieroglyph = mongoose.model("Hieroglyph", hieroglyphSchema);


module.exports = {
    Hieroglyph
};
