const express = require('express')
const router = express.Router();
const {Users,register,login,UserData, updateCountLeave, countUsers} = require('../controllers/auth-controller')
const validate = require('../middlewares/validate-middleware');
const {signupSchema,loginSchema} = require('../validators/auth-validator');
const authMiddleware = require('../middlewares/auth-middleware.js');
// router.get('/',home)
// router.get('/register',register)
router.route('/register').get(register).post(validate(signupSchema),register);
// router.route('/userData').get(UserData);
router.route('/login').post(validate(loginSchema),login);
router.route('/Users').get(authMiddleware,Users);
router.route('/userData').get(UserData);
router.route('/countLeave').put(authMiddleware,updateCountLeave);
router.route('/countUser').get(countUsers);

module.exports = router;