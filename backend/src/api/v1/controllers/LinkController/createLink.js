const Link = require("../../models/Link");

const createLink = async (req, res) => {
  try {
    let data = new Link(req.body);
    data = await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createLink };
