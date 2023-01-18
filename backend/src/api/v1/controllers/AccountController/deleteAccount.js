const Account = require("../../models/Account");
const { cloudinary } = require("../../../../config/Cloudinary");
const { tryCatch } = require("../../utils/tryCatch");
const { successRespond, customRespond } = require("../../utils/respondUtils");
const AppError = require("../../utils/AppError");

exports.deleteAccount = tryCatch(async (req, res) => {
  let data = await Account.findOne({ _id: req.params.id });
  if (!data) {
    throw new AppError("Not Found", 404);
  }
  if (data.filename) {
    await cloudinary.uploader.destroy(data.filename);
  }
  await Account.deleteOne({ _id: req.params.id });
  successRespond(res, customRespond.DeleteSuccess);
});
