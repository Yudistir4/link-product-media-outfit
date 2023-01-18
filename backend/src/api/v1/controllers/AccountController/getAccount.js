const Account = require("../../models/Account");
const { successRespond, customRespond } = require("../../utils/respondUtils");
const { tryCatch } = require("../../utils/tryCatch");

exports.getAccount = tryCatch(async (req, res) => {
  const options = {
    page: req.query.page || 1,
    limit: req.query.limit || 10,
    sort: req.query.sort || "",
  };

  const datas = await Account.paginate({}, options);
  successRespond(res, customRespond.Success, datas);
});
