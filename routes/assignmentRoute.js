const express = require('express');
const router = express.Router();

const assignmentControler = require('../controllers/assignmentController');

router.get('/', assignmentControler.showAssignmentsList);
router.get('/add', assignmentControler.showAddAssignmentForm);
router.get('/edit/:assignmentId', assignmentControler.showEditAssignmentForm);
router.get('/details/:assignmentId', assignmentControler.showAssignmentDetails);
router.post('/add', assignmentControler.addAssignment);
router.post('/edit', assignmentControler.updateAssignment);
router.get('/delete/:assignmentId', assignmentControler.deleteAssignment);
module.exports = router;