var express = require('express');
var router = express.Router();

var servicesController = require('../controllers/services');
var authMiddleware = require('../controllers/auth.middleware');

router.get('/', servicesController.getAll);
router.post('/', authMiddleware.requireSignin, servicesController.create);
router.delete('/', authMiddleware.requireSignin, servicesController.removeAll);
router.get('/:serviceId', servicesController.getServices);
router.put('/:serviceId', authMiddleware.requireSignin, servicesController.update);
router.delete('/:serviceId', authMiddleware.requireSignin, servicesController.remove);

module.exports = router;