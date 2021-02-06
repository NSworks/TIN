const express = require('express');
const router = express.Router();

const detectiveControler = require('../controllers/detectiveController');

router.get('/', detectiveControler.showDetectiveList);
router.get('/add', detectiveControler.showAddDetectiveForm);
router.get('/details/:detectiveId', detectiveControler.showDetectiveDetails);
router.get('/edit/:detectiveId', detectiveControler.showEditDetectiveForm);
router.post('/add', detectiveControler.addDetective);
router.post('/edit', detectiveControler.updateDetective);
router.get('/delete/:detectiveId', detectiveControler.deleteDetective);
module.exports = router;