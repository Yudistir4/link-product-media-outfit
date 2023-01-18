const Link = require("../../models/Link");
const AppError = require("../../utils/AppError");
const { customRespond, successRespond } = require("../../utils/respondUtils");
const { tryCatch } = require("../../utils/tryCatch");

exports.deleteLink = tryCatch(async (req, res) => {
  const respond = await Link.deleteOne({ _id: req.params.id });
  if (respond.deletedCount == 0) {
    throw new AppError("Link Not Found", 404);
  }
  successRespond(res, customRespond.DeleteSuccess);
});
