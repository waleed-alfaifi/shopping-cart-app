const jsonwebtoken = require('jsonwebtoken');

const loggedIn = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res
      .status(403)
      .json({ error: 'You are not permitted to access this route.' });
  }

  try {
    const decoded = await jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET || 'super secret key for local testing'
    );
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res
        .status(403)
        .json({ error: 'You are not permitted to access this route.' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.loggedIn = loggedIn;
