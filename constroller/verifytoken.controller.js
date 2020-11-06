const jwt = require("jsonwebtoken");
// middleware to validate token
const verifyToken = (req, res, next) => {
  const token = req.body.token;
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const verified = jwt.verify(token, 'APINODEJS');
    console.log(verified);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Token is not valid" });
    console.log(err);
  }
};
module.exports = verifyToken;