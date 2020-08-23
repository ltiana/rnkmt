const auth = require('../middleware/auth.js'),
      express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      {LangUnit, validateLangUnit} = require('../models/langUnit.js');

// create
// the request body should contain the langUnit info
router.post('/', auth, async (req, res) => {

    let langUnit = req.body;

    // validate input
    const { error } = validateLangUnit(langUnit);
    if (error) {
        console.log('JOI: ', error);
        return res.status(400).send(error);
    }

    // TODO check that referenced hieroglyph ID has the right format
    // langUnit.hieroglyph = mongoose.types.ObjectId(langUnit.hieroglyph) 

    // TODO check that referenced hieroglyph exists

    let  newLangUnit = await LangUnit.create(langUnit);
    res.status(201).send(newLangUnit);

});

// read all langUnits
// everybody can read - no authentication needed
// TODO search
// TODO pagination
router.get('/', async (req, res) => {

    let allLangUnits = await LangUnit.find();
    if(!allLangUnits) return res.status(500).send('Could not fetch langUnits');
    res.status(200).send(allLangUnits);

})


// read one
// everybody can read - no authentication needed
router.get('/:id', async (req, res) => {
    let id = new mongoose.Types.ObjectId(req.params.id);
    let foundLangUnit = await LangUnit.findById(id);
    if(!foundLangUnit) return res.status(404).send('Invalid LangUnit ID');

    // TODO how to fetch file
    res.status(200).send(foundLangUnit);
})

// update
// the request body should contain the hieroglyph info and file
router.patch('/:id', auth, async (req, res) => {
    
    let langUnit = req.body;

    // validate input
    //langUnit.hieroglyph = new mongoose.Types.ObjectId(langUnit.hieroglyph);
    const { error } = validateLangUnit(langUnit);
    if (error) {
        console.log('JOI: ', error);
        return res.status(400).send(error);
    }

    langUnit.updated = Date.now();

    let id = new mongoose.Types.ObjectId(req.params.id);
    let updatedLangUnit = await LangUnit.findOneAndUpdate({_id: id}, {$set: langUnit }, {new: true});
    if(!updatedLangUnit) return res.status(404).send('Invalid LangUnit ID');

    // TODO How to change file
    res.status(200).send(updatedLangUnit);

})


//delete
router.delete('/:id', auth, async (req, res) => {
    let id = new mongoose.Types.ObjectId(req.params.id);
    // TODO how ro remove file
    // TODO - CONSIDER not possible to delete is the hieroglyph is in use in language units
    let deletedLangUnit = await LangUnit.findOneAndDelete({_id: id});
    if(!deletedLangUnit) return res.status(404).send('Invalid LangUnit ID');
    res.status(200).send('LangUnit was deleted');
});


module.exports = router;
