const router = require('express').Router();
const usersRoutes = require('./users');
const authRoutes = require('./auth');

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);

module.exports = router;
