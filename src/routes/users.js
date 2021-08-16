const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { userSchema, updateUserSchema, idSchema } = require('../utils/schemas/user.schema');
const validateHandler = require('../middlewares/validationHandler.middleware');

router.get('/', userController.get);
router.post('/', validateHandler(userSchema, 'body'), userController.signUp);
router.get('/:id', validateHandler(idSchema, 'params'), userController.get);
router.delete('/:id', validateHandler(idSchema, 'params'), userController.delete);
router.put('/:id', validateHandler(idSchema, 'params'), validateHandler(updateUserSchema), userController.update);

module.exports = router;
