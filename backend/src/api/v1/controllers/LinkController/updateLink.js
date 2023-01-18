const Link = require("../../models/Link");
const AppError = require("../../utils/AppError");
const { successRespond, customRespond } = require("../../utils/respondUtils");
const { tryCatch } = require("../../utils/tryCatch");

exports.updateLink = tryCatch(async (req, res) => {
  let data = await Link.findOne({ _id: req.params.id });
  if (!data) {
    throw new AppError("Link Not Found", 404);
  }
  data.number = req.body.number;
  data.links = req.body.links;

  await data.save();
  successRespond(res, customRespond.UpdateSuccess, data);
});
