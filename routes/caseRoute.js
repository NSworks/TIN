const express = require('express');
const router = express.Router();

const caseControler = require('../controllers/caseController');

router.get('/', caseControler.showCaseList);
router.get('/add', caseControler.showAddCaseForm);
router.get('/edit/:caseId', caseControler.showEditCaseForm);
router.get('/details/:caseId', caseControler.showCaseDetails);
router.post('/add', caseControler.addCase);
router.post('/edit', caseControler.updateCase);
router.get('/delete/:caseId', caseControler.deleteCase);
module.exports = router;