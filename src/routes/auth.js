const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/verify', authController.verify);
// router.get('/', authController.create);

module.exports = router;
