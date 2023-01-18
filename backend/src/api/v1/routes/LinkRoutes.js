const { createLink } = require("../controllers/LinkController/createLink");
const { getLinks } = require("../controllers/LinkController/getLinks");

const router = require("express").Router();
router.get("/", getLinks);
router.post("/", createLink);

module.exports = router;
