const Link = require("../../models/Link");

const getLinks = async (req, res) => {
  try {
    const options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      sort: req.query.sort || "",
      populate: {
        path: "account",
        options: { sort: { createdAt: -1 }, perDocumentLimit: 12 },
      },
    };

    // if (req.query.username) {
    //   req.query.username = new RegExp(req.query.username);
    // }

    const datas = await Link.paginate({}, options);
    res.status(200).json(datas);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { getLinks };
