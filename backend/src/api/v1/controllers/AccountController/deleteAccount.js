const Account = require("../../models/Account");

const deleteAccount = async (req, res) => {
  try {
    await Account.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Delete success" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.deleteAccount = deleteAccount;
