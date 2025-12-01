var express = require('express');
var router = express.Router();

var userController = require('../controllers/users');
var authMiddleware = require('../controllers/auth.middleware');

router.get('/', userController.getAll);
router.post('/', userController.create);
router.delete('/', authMiddleware.requireSignin, userController.removeAll);
router.get('/:userId', userController.getUser);
router.put('/:userId', authMiddleware.requireSignin, userController.update);
router.delete('/:userId', authMiddleware.requireSignin, userController.remove);

module.exports = router;