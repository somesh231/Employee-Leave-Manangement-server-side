const express = require('express');
const { Empleavepst, EmpLeaveHome, EmpLeave, EmpLeaveApprove, CountDeclined, CountApproved} = require('../controllers/empleavform-controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware.js');

router.route("/empleavform").post(Empleavepst);
router.route("/").get(authMiddleware,EmpLeaveHome);
router.route("/Emp").get(EmpLeave);
router.route('/approve').put(EmpLeaveApprove);
router.route('/countrequestapproved').get(CountApproved);
router.route('/countrequestdeclined').get(CountDeclined);

module.exports =router