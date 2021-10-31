const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { userSchema, updateUserSchema, idSchema } = require('../utils/schemas/user.schema');
const validateHandler = require('../middlewares/validationHandler.middleware');

router.post('/', validateHandler(userSchema, 'body'), userController.signUp);
router.get('/:id?', validateHandler(idSchema, 'params[id]'), userController.get);
router.delete('/:id', validateHandler(idSchema, 'params[id]'), userController.delete);
router.put('/:id', validateHandler(idSchema, 'params[id]'), validateHandler(updateUserSchema, 'body'), userController.update);

module.exports = router;
