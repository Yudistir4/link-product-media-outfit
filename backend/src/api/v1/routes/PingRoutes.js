const { ping } = require("../controllers/ping");

const router = require("express").Router();
router.get("/", ping);

module.exports = router;
