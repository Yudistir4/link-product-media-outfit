/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');

module.exports.verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Token is not valid!' });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'You are not authenticated!' });
  }
};
