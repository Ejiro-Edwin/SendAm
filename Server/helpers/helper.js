const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');

dotenv.config();

const helper = {


  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },


  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },


  // isValidEmail(email) {
  //   return /\S+@\S+\.\S+/.test(email);
  // },


  generateToken(payload) {
    const token = jwt.sign(
      payload,
      process.env.SECRET, { expiresIn: '20d' }
    );
    return token;
  },


  
  sendEmail() {
     sgMail.setApiKey(process.env.sendGridKey);
     const mail = {
       to: "ejirotesting@gmail.com",
       from: 'Send-IT <ejiroedwin@gmail.com',
       subject: `Dear customer`,
       html: "Your PDO has been updated",
     };
     sgMail.send(mail);
  }
}

module.exports = helper;