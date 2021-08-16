const express = require('express');

const router = express.Router();
const usersRoutes = require('./users');
const authRoutes = require('./auth');
// const carsRoutes = require('./cars');

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
// router.use('/cars', carsRoutes);

module.exports = router;
