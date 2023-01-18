const Account = require("../../models/Account");
const { cloudinary } = require("../../../../config/Cloudinary");
const updateProfilePic = async (req, res) => {
  try {
    let data = await Account.findOne({ _id: req.params.id });

    // Delete image
    if (data.filename) {
      await cloudinary.uploader.destroy(data.filename);
    }

    data.profilePicUrl = req.file.path;
    data.filename = req.file.filename;
    await data.save();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { updateProfilePic };
