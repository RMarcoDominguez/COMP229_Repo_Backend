var express = require('express');
var router = express.Router();

var projectController = require('../controllers/projects');
var authMiddleware = require('../controllers/auth.middleware');

router.get('/', projectController.getAll);
router.post('/', authMiddleware.requireSignin, projectController.create);
router.delete('/', authMiddleware.requireSignin, projectController.removeAll);
router.get('/:projectId', projectController.getProject);
router.put('/:projectId', authMiddleware.requireSignin, projectController.update);
router.delete('/:projectId', authMiddleware.requireSignin, projectController.remove);

module.exports = router;