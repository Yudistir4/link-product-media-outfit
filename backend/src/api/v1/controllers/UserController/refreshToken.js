/* eslint-disable no-undef */
const {
  successRespond,
  customRespond,
  errorRespond,
} = require('../../utils/respondUtils');
const jwt = require('jsonwebtoken');
const { tryCatch } = require('../../utils/tryCatch');
const {
  generateRefreshToken,
  generateAccessToken,
} = require('../../utils/jwtUtils');

exports.refreshToken = tryCatch(async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return errorRespond(res, customRespond.BadRequest);
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, (err, user) => {
    if (err) {
      return errorRespond(res, customRespond.TokenInvalid);
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    successRespond(res, customRespond.Success, {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
});
