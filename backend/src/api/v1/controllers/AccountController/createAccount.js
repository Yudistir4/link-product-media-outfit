const Account = require("../../models/Account");

const createAccount = async (req, res) => {
  try {
    let data = new Account(req.body);
    data = await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createAccount };
