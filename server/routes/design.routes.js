const express = require('express');

const designController = require('../controllers/design.controller');

const router = express.Router();

router
	.route('/')
	.get(designController.getAllDesigns)
	.post(designController.createDesign);
router
	.route('/:id')
	.get(designController.getDesign)
	.patch(designController.updateDesign)
	.delete(designController.deleteDesign);

module.exports = router;
