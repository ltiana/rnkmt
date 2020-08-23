const { toLower, toUpper } = require('lodash');

const auth = require('../middleware/auth.js'),
      express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      {Hieroglyph, validateHieroglyph} = require('../models/hieroglyph.js');

// create
// the request body should contain the hieroglyph info and file
router.post('/', auth, async (req, res) => {

    let hieroglyph = req.body;

    // validate input
    const { error } = validateHieroglyph(hieroglyph);
    if (error) {
        console.log('JOI: ', error);
        return res.status(400).send(error);
    }

    // check for Gardiner code existance
    hieroglyph.gardiner = toUpper(hieroglyph.gardiner);
    let gardinerExists = await Hieroglyph.findOne({gardiner: req.body.gardiner });
    if (gardinerExists) {
        return res.status(400).send('This Gardiner code is already used')
    }

    //TODO: validate file format and file size
    // TODO save file and return path

    let  newHieroglyph = await Hieroglyph.create(hieroglyph);
    res.status(201).send(newHieroglyph);

});

// read all hieroglyphs
// everybody can read - no authentication needed
// TODO search
// TODO pagination
router.get('/', async (req, res) => {

    let allHieroglyphs = await Hieroglyph.find();
    if(!allHieroglyphs) return res.status(500).send('Could not fetch hieroglyphs');

    // TODO how to fetch files
    // TODO How to send files

    res.status(200).send(allHieroglyphs);

})


// read one
// everybody can read - no authentication needed
router.get('/:id', async (req, res) => {
    let id = new mongoose.Types.ObjectId(req.params.id);
    let foundHieroglyph = await Hieroglyph.findById(id);
    if(!foundHieroglyph) return res.status(404).send('Invalid hieroglyph ID');

    // TODO how to fetch file
    // TODO how to send a file

    res.status(200).send(foundHieroglyph);
})

// update
// the request body should contain the hieroglyph info and file
router.patch('/:id', auth, async (req, res) => {
    let id = new mongoose.Types.ObjectId(req.params.id);
    let hieroglyph = req.body;

    // validate input
    const { error } = validateHieroglyph(hieroglyph);
    if (error) {
        console.log('JOI: ', error);
        return res.status(400).send(error);
    }

    // TODO validate file size and file format

    hieroglyph.updated = Date.now();

    let updatedHieroglyph = await Hieroglyph.findOneAndUpdate({_id: id}, {$set: hieroglyph }, {new: true});
    if(!updatedHieroglyph) return res.status(404).send('No such hieroglyph');

    // TODO How to change file - delete old file, save new file
    // How to send a file
    res.status(200).send(updatedHieroglyph);

})


//delete
router.delete('/:id', auth, async (req, res) => {

    let id = new mongoose.Types.ObjectId(req.params.id);

    // TODO how to remove file
    // TODO - CONSIDER not possible to delete is the hieroglyph is in use in language units
    let deletedHieroglyph = await Hieroglyph.findOneAndDelete({_id: id});
    if(!deletedHieroglyph) return res.status(404).send('No such hieroglyph');
    res.status(200).send('Hieroglyph was deleted');
});


module.exports = router;
