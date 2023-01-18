const Account = require("../../models/Account");
const { successRespond, customRespond } = require("../../utils/respondUtils");
const { tryCatch } = require("../../utils/tryCatch");

exports.createAccount = tryCatch(async (req, res) => {
  let data = new Account(req.body);
  data = await data.save();
  successRespond(res, customRespond.AccountCreated, data);
});
