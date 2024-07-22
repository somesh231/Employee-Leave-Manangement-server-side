const express = require('express')
const router = express.Router();

const {depSecHome,depSecForm,depSecMng} = require('../controllers/Depsec-controller')

router.route("/").get(depSecHome);
router.route("/depsecform").post(depSecForm);
router.route("/updateName/:id").put(depSecMng);

module.exports = router;

