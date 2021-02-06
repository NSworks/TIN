const express = require('express');
const router = express.Router();

const assignmentApiController = require('../../api/AssignmentAPI');

router.get('/', assignmentApiController.getAssignments);
router.get('/:assignmentId', assignmentApiController.getAssignmentById);
router.post('/', assignmentApiController.createAssignment);
router.put('/:assignmentId', assignmentApiController.updateAssignment);
router.delete('/:assignmentId', assignmentApiController.deleteAssignment);

module.exports = router;