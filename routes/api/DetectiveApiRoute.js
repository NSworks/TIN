const express = require('express');
const router = express.Router();

const detectiveApiController = require('../../api/DetectiveAPI');

router.get('/', detectiveApiController.getDetectives);
router.get('/:detectiveId', detectiveApiController.getDetectiveById);
router.post('/', detectiveApiController.createDetective);
router.put('/:detectiveId', detectiveApiController.updateDetective);
router.delete('/:detectiveId', detectiveApiController.deleteDetective);

module.exports = router;