const User = require('../../models/User');
const {
  successRespond,
  customRespond,
  errorRespond,
} = require('../../utils/respondUtils');
const { tryCatch } = require('../../utils/tryCatch');
const bcrypt = require('bcrypt');

exports.signup = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return errorRespond(res, customRespond.DuplicatedUser);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPasword = await bcrypt.hash(password, salt);
  let data = new User({ email, password: hashedPasword });
  data = await data.save();
  delete data._doc.password;
  successRespond(res, customRespond.SignupSuccess, data);
});
