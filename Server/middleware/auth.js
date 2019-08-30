const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class Auth {
  static verifyToken (req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access Denied. No token provided');

    try{
      const decoded = jwt.verify(token, "secret");
       req.user = decoded.userId;
       req.adminStatus = decoded.isAdmin
       next();
    } catch (ex){
      res.status(400).send('Invalid Token');
    }

      // jwt.verify(req.token, process.env.SECRET , (err, data) => {
      //   if (err) {
      //     res.status(403).send("You cannot access this page because you require a token to access it");
      //   } else {
      //       req.user = data.userId,
      //       req.adminStatus = data.isAdmin
      //       next()
      //     }
      //   })
      } 
  }


module.exports = Auth;

// module.exports = function(req,res,next){
//   const token = req.header('x-auth-token');
//   if(!token) return res.status(401).send('Access Denied. No token provided');

//   try {
//       const decoded = jwt.verify(token, config.get('JwtPrivateKey'));
//       req.user = decoded;
//       next();
//   } catch (ex) {
//       res.status(400).send('Invalid Token');
//   }

// }