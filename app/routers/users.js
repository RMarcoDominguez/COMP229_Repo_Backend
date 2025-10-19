var express = require('express');
var router = express.Router();

var userController = require('../controllers/users');

router.get('/', userController.getAll);
router.post('/', userController.create);
router.delete('/', userController.removeAll);
router.get('/:userId', userController.getUser);
router.put('/:userId', userController.update);
router.delete('/:userId', userController.remove);

module.exports = router;