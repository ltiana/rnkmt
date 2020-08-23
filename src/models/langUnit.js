const  mongoose = require('mongoose'),
    {Hieroglyph} = require('./hieroglyph.js');

const validTypes = ['uniliteral', 'biliteral', 'triliteral', 'ideogram', 'word', 'phrase'];    

const langUnitSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    hieroglyph: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hieroglyph",
        required: true
    },
    type: {
        type: String,
        enum: validTypes,
        required: true
    },
    transliteration: {
        type: String
    },
    meaning: {
        type: String,
        required: true
    },
    grammar: {
        type: String
    },
    notes: {
        type: String
    }
});


const LangUnit = mongoose.model("LangUnit", langUnitSchema);


module.exports = {
    LangUnit
};