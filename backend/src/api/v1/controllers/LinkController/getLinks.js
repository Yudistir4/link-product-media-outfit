const Link = require("../../models/Link");
const { successRespond, customRespond } = require("../../utils/respondUtils");
const { tryCatch } = require("../../utils/tryCatch");

exports.getLinks = tryCatch(async (req, res) => {
  const options = {
    page: req.query.page || 1,
    limit: req.query.limit || 10,
    sort: req.query.sort || { number: -1 },
  };

  const datas = await Link.paginate(
    { account: { $eq: req.query.account } },
    options
  );

  successRespond(res, customRespond.Success, datas);
});
