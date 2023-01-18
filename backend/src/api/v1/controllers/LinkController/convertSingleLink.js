const {
  successRespond,
  customRespond,
  // errorRespond,
} = require("../../utils/respondUtils");
const { convert } = require("../../utils/shopeeUtils");
const { tryCatch } = require("../../utils/tryCatch");

exports.convertSingleLink = tryCatch(async (req, res) => {
  const shortLink = await convert(req.body.originUrl);
  return successRespond(res, customRespond.ConvertSuccess, { shortLink });
});
