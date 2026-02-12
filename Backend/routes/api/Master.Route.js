const express = require("express");
const router = express.Router();

const registerOrganization = require("../../controller/Auth/registerorganization");
console.log("TYPE OF registerOrganization:", typeof registerOrganization);
// Master creates organization
router.post("/organizations", registerOrganization );

module.exports = router;
