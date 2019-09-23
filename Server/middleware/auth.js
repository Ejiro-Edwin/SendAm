const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class Auth {
  static verifyToken (req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access Denied. No token provided');

    try{
      const decoded = jwt.verify(token, "applicationsecret");
       req.user = decoded.userId;
       req.adminStatus = decoded.isAdmin
       next();
    } catch (ex){
      res.status(400).send('Invalid Token');
    }

  }
}

module.exports = Auth;