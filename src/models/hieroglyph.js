const  Joi = require('@hapi/joi'),
    mongoose = require('mongoose');

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
        required: true,
        unique: [true, 'The Gardiner code must be unique. You already have a heiroglyph with this code'],
    },
    gardinergroup: {
        type: String,
        required: true,
    },
    width: {
        type: String,
        enum: ["thin","narrow","broad"]
    },
    height: {
        type: String,
        enum: ["tall","low"]
    },
    description: {
        type: String
    },
    notes: {
        type: String
    }
});


const Hieroglyph = mongoose.model("Hieroglyph", hieroglyphSchema);


//Validation

function validateHieroglyph(registerInfo) {

    const schema = Joi.object({
        file: Joi.string().min(2).max(150).required().label('File name'),
        gardiner: Joi.string().min(2).max(5).required().label('Gardiner code'),
        gardinergroup: Joi.string().min(1).max(2).required().label('Gardiner group'),
        width: Joi.string().label('Width'),
        height: Joi.string().label('Height'),
        description: Joi.string().label('Description'),
        notes: Joi.string().label('Notes')
    })

    return schema.validate(registerInfo);
};



module.exports = {
    Hieroglyph,
    validateHieroglyph
};
