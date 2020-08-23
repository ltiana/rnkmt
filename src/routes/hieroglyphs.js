const auth = require('../middleware/auth.js'),
      express = require('express'),
      router = express.Router(),
      {Hieroglyph} = require('../models/hieroglyph.js');

// create
// the request body should contain the hieroglyph info and file
router.post('/', auth, async (req, res) => {

    let hieroglyph = req.body;

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

    let foundHieroglyph = await Hieroglyph.findById(req.params.id);
    if(!foundHieroglyph) return res.status(404).send('Invalid hieroglyph ID');

    // TODO how to fetch file
    // TODO how to send a file

    res.status(200).send(foundHieroglyph);
})

// update
// the request body should contain the hieroglyph info and file
router.patch('/:id', auth, async (req, res) => {

    let changes = req.body;

    // TODO validate file size and file format

    changes.updated = Date.now();

    let updatedHieroglyph = await Hieroglyph.findOneAndUpdate({_id: req.params.id}, {$set: changes }, {new: true});
    if(!updatedHieroglyph) return res.status(404).send('No such hieroglyph');

    // TODO How to change file - delete old file, save new file
    // How to send a file
    res.status(200).send(updatedHieroglyph);

})


//delete
router.delete('/:id', auth, async (req, res) => {

    // TODO how to remove file
    // TODO - CONSIDER not possible to delete is the hieroglyph is in use in language units
    let deletedHieroglyph = await Hieroglyph.findOneAndDelete({_id: req.params.id});
    if(!deletedHieroglyph) return res.status(404).send('No such hieroglyph');
    res.status(200).send('Hieroglyph was deleted');
});


module.exports = router;
