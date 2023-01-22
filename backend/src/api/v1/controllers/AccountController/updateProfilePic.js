const Account = require("../../models/Account");
const { cloudinary } = require("../../../../config/Cloudinary");
const { tryCatch } = require("../../utils/tryCatch");
const { successRespond, customRespond } = require("../../utils/respondUtils");
const AppError = require("../../utils/AppError");

exports.updateProfilePic = tryCatch(async (req, res) => {
  let data = await Account.findOne({ _id: req.params.id });
  if (!data) {
    throw new AppError("Not Found", 404);
  }
  // Delete image
  if (data.filename) {
    await cloudinary.uploader.destroy(data.filename);
  }
  console.log(req.file);
  data.profilePicUrl = req.file.path;
  data.filename = req.file.filename;
  await data.save();
  successRespond(res, customRespond.UpdateSuccess, data);
});
