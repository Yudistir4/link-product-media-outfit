const Link = require("../../models/Link");
const {
  successRespond,
  customRespond,
  // errorRespond,
} = require("../../utils/respondUtils");
const { convert } = require("../../utils/shopeeUtils");
const { tryCatch } = require("../../utils/tryCatch");

exports.createLink = tryCatch(async (req, res) => {
  // try {
  let data = new Link(req.body);
  // try {
  for (let i = 0; i < data.links.length; i++) {
    data.links[i].link = await convert(data.links[i].link, i + 1);
  }
  // } catch (error) {
  //   errorRespond(res, customRespond.BadRequest, error.message);
  // }

  data = await data.save();
  successRespond(res, customRespond.RecordCreated, data);
  // } catch (error) {
  //   errorRespond(res, customRespond.InternalServerError, error.message);
  // }
});
