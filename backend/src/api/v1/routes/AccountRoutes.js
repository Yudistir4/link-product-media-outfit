const {
  createAccount,
} = require("../controllers/AccountController/createAccount");
const {
  deleteAccount,
} = require("../controllers/AccountController/deleteAccount");
const { getAccount } = require("../controllers/AccountController/getAccount");

const multer = require("multer");
const {
  updateProfilePic,
} = require("../controllers/AccountController/updateProfilePic");
const { storage } = require("../../../config/Cloudinary");
const {
  updateAccount,
} = require("../controllers/AccountController/updateAccount");

const upload = multer({ storage: storage });
const router = require("express").Router();

router.get("/", getAccount);
router.post("/", createAccount);
router.delete("/:id", deleteAccount);
router.put("/:id", updateAccount);
router.put("/:id/upload", upload.single("image"), updateProfilePic);

module.exports = router;
