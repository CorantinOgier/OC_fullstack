const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const stuffCtrl = require('../controllers/stuff');


// lorsqu'on veut protéger une route, on rajoute le middleware avant le controller
router.post('/', auth, stuffCtrl.createThing); // on veut protéger la création
router.put('/:id', auth, stuffCtrl.modifyThing); // la modification
router.delete('/:id', auth, stuffCtrl.deleteThing); // la suppression
router.get('/:id', auth, stuffCtrl.getOneThing); // aller chercher le stuff dans la base
router.get('/', auth, stuffCtrl.getAllThings);

module.exports = router;