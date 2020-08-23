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


//Validation

function validateHieroglyph(registerInfo) {

    const schema = Joi.object({
        file: Joi.string().min(2).max(150).required().label('File name'),
        gardiner: Joi.string().min(2).max(100).required().label('Gardiner'),
        groupname: Joi.string().min(2).max(200).required().label('Group name'),
        description: Joi.string().label('Description'),
        notes: Joi.string().label('Notes')
    })

    return schema.validate(registerInfo);
};



module.exports = {
    Hieroglyph,
    validateHieroglyph
};
