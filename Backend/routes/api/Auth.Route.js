const express = require("express");
const router = express.Router();
const loginuser = require("../../controller/Auth/loginuser");

router.post("/login", loginuser);

module.exports = router;