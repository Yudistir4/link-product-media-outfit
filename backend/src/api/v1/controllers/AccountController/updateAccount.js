const Account = require("../../models/Account");
const AppError = require("../../utils/AppError");
const { successRespond, customRespond } = require("../../utils/respondUtils");
const { tryCatch } = require("../../utils/tryCatch");

exports.updateAccount = tryCatch(async (req, res) => {
  let data = await Account.findOne({ username: req.body.username });
  if (data && data.id != req.params.id) {
    throw new AppError("Username Duplicated", 400);
  }

  data = await Account.findOne({ _id: req.params.id });
  if (!data) {
    throw new AppError("Not Found", 404);
  }
  data.username = req.body.username;
  await data.save();
  successRespond(res, customRespond.UpdateSuccess, data);
});
