const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class Auth {
  static verifyToken (req, res, next) {
    const bearerHeader = req.headers['authorization'] || req.query.token;
    if (typeof bearerHeader !== 'undefined') {
      const bearerArray = bearerHeader.split(" ");
      const bearerToken = bearerArray[1];
      req.token = bearerToken;

      jwt.verify(req.token, "SECRET", (err, data) => {
        if (err) {
          res.status(403).send("You cannot access this page because you require a token to access it");
        } else {
            req.user = data.userId,
            req.adminStatus = data.isAdmin
            next()
          }
        })
      } else {
        res.status(403).json({"status":403, "message":"Forbidden"});
      }
  }
}

module.exports = Auth;