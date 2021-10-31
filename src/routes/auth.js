const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const validateHandler = require('../middlewares/validationHandler.middleware');
const { loginSchema, accessTokenSchema } = require('../utils/schemas/user.schema');

router.post('/login', validateHandler(loginSchema, 'body'), authController.login);
router.get('/verify', validateHandler(accessTokenSchema, 'body'), authController.verify);

module.exports = router;
