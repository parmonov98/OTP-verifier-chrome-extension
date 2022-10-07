const express = require("express");
const router = express.Router();
const {
  getProperties
} = require("../../controllers/properties");


router.route("/").post(getProperties);

module.exports = router;
