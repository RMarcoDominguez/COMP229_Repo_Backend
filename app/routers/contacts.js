var express = require('express');
var router = express.Router();

var contactController = require('../controllers/contacts');
var authMiddleware = require('../controllers/auth.middleware');

router.get('/', contactController.getAll);
router.post('/', contactController.create);
router.delete('/', authMiddleware.requireSignin, contactController.removeAll);
router.get('/:contactId', contactController.getContact);
router.put('/:contactId', authMiddleware.requireSignin, contactController.update);
router.delete('/:contactId', authMiddleware.requireSignin, contactController.remove);

module.exports = router;