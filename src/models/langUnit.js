const  Joi = require('@hapi/joi'),
    mongoose = require('mongoose'),
    {Hieroglyph} = require('./hieroglyph.js');

    Joi.objectId = require('joi-objectid')(Joi),Joi.objectId = require('joi-objectid')(Joi);

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


//Validation

function validateLangUnit(registerInfo) {

    const schema = Joi.object({
        hieroglyph: Joi.objectId(),
        type: Joi.string().min(2).max(100).required().label('Type'),
        transliteration: Joi.string().label('transliteration'),
        meaning: Joi.string().min(1).max(500).required().label('Meaning'),
        grammar: Joi.string().label('Grammar'),
        notes: Joi.string().label('Notes')
    })

    return schema.validate(registerInfo);
};


module.exports = {
    LangUnit,
    validateLangUnit
};