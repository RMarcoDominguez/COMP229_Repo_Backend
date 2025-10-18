var express = require('express');
var router = express.Router();

var servicesController = require('../controllers/services');

router.get('/', servicesController.getAll);
router.post('/', servicesController.create);
router.get('/:serviceId', servicesController.getServices);
router.put('/:serviceId', servicesController.update);
router.delete('/:serviceId', servicesController.remove);

module.exports = router;