const auth = require('../middleware/auth.js'),
      express = require('express'),
      router = express.Router(),
      {LangUnit} = require('../models/langUnit.js');

// create
// the request body should contain the langUnit info
router.post('/', auth, async (req, res) => {

    let langUnit = req.body;

    // TODO check that referenced hieroglyph ID has the right format
    // TODO check that referenced hieroglyph exists

    let  newLangUnit = await LangUnit.create(langUnit);
    res.status(201).send(newLangUnit.name);

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

    let foundLangUnit = await LangUnit.findById(req.params.id);
    if(!foundLangUnit) return res.status(404).send('Invalid LangUnit ID');

    // TODO how to fetch file
    res.status(200).send(foundLangUnit);
})

// update
// the request body should contain the hieroglyph info and file
router.patch('/:id', auth, async (req, res) => {

    let changes = req.body;

    changes.updated = Date.now();

    let updatedHieroglyph = await Hieroglyph.findOneAndUpdate({_id: req.params.id}, {$set: changes }, {new: true});
    if(!updatedHieroglyph) return res.status(404).send('No such hieroglyph');

    // TODO How to change file
    res.status(200).send(updatedHieroglyph);

})


//delete
router.delete('/:id', auth, async (req, res) => {

    // TODO how ro remove file
    // TODO - CONSIDER not possible to delete is the hieroglyph is in use in language units
    let deletedHieroglyph = await Hieroglyph.findOneAndDelete({_id: req.params.id});
    if(!deletedHieroglyph) return res.status(404).send('No such hieroglyph');
    res.status(200).send('Hieroglyph was deleted');
});


module.exports = router;
