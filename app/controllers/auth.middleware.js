const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports.requireSignin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authorization header missing or malformed.'
      });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Invalid or expired token.'
        });
      }

      req.auth = decoded;
      next();
    });
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};