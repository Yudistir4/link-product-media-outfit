const Account = require("../../models/Account");

const getAccount = async (req, res) => {
  try {
    const options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      sort: req.query.sort || "",
    };

    // if (req.query.username) {
    //   req.query.username = new RegExp(req.query.username);
    // }

    const datas = await Account.paginate({}, options);
    res.status(200).json(datas);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getAccount = getAccount;
