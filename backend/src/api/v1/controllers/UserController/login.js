const User = require('../../models/User');
const {
  successRespond,
  customRespond,
  errorRespond,
} = require('../../utils/respondUtils');
const bcrypt = require('bcrypt');
const { tryCatch } = require('../../utils/tryCatch');
const {
  generateRefreshToken,
  generateAccessToken,
} = require('../../utils/jwtUtils');

exports.login = tryCatch(async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return errorRespond(res, customRespond.UserNotFound);
  }
  const { password, ...others } = user._doc;
  const validate = await bcrypt.compare(req.body.password, password);
  if (!validate) {
    return errorRespond(res, customRespond.InvalidPassword);
  }
  others.accessToken = generateAccessToken(others);
  others.refreshToken = generateRefreshToken(others);

  successRespond(res, customRespond.Success, others);
});
