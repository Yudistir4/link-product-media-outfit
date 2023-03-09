const { login } = require('../controllers/UserController/login');
const { refreshToken } = require('../controllers/UserController/refreshToken');
const { signup } = require('../controllers/UserController/signup');

const router = require('express').Router();

router.post('/refresh', refreshToken);
router.post('/login', login);
router.post('/signup', signup);

module.exports = router;
