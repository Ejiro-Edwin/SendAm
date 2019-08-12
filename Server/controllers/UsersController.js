const moment = require ('moment');
// const db = require('../config/db');
const dotenv = require('dotenv');
const helper = require ('../helpers/helper');
const {
  signUpSchema,
  loginSchema
} = require ('../helpers/validator');

dotenv.config();

class User {
  static signup(req, res) {     

    const fieldError = signUpSchema(req.body)
    if (fieldError.error) return res.status(400).send(fieldError.error.details[0].message);

    const hashedPassword = helper.hashPassword(req.body.password);
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      othernames: req.body.othernames,
      email: req.body.email,
      username: req.body.username,
      registered: moment(new Date()),
      isAdmin: 'false',
      password: hashedPassword
    };
    
    
    const Check = `SELECT * FROM users WHERE email='${newUser.email}'`
    db.query(Check, function (err, result) {
      if (err)  return res.status(500).send(err);

      if (result.length > 0) res.send({"error": "Username already exists"})

    });

    const query = `INSERT INTO users (firstname,lastname,othernames,email,username,registered,isAdmin,password) 
    VALUES('${newUser.firstname}','${newUser.lastname}','${newUser.othernames}','${newUser.email}','${newUser.username}',
    '${newUser.registered}','${newUser.isAdmin}','${newUser.password}')`

     db.query(query, function (error, result) {
      if (error)  return res.status(500).send(error);

        if(result.rowCount >=1) {
          res.status(200).json({"status":200,"message":"User saved successfully","data": result.rows[0]})
        } else if (result.rowCount === 0) {
          res.status(500).json({"status": 500, "message": "The user could not be saved"})
        }

     
        });
}
  

  static login (req, res) {
    
    const fieldError = loginSchema(req.body)
  if (fieldError.error) return res.status(400).send(fieldError.error.details[0].message);
    
  
    const loginData = {
      email: req.body.email,
      password: req.body.password,
    }

    const query = `SELECT * FROM users WHERE email='${loginData.email}'`
    db.query(query, function (err, result) {
      if (err)  return res.status(500).send(err);

      if(result.rowCount ==0) {
        res.status(400).json({ "status": 400, "error": 'An error occured while trying to log you in Check your details again'})
      } else if (result.rowCount >=1) {
          if(!helper.comparePassword(result.rows[0].password, req.body.password)) {
            return res.status(400).json({ 'message': 'The credentials you provided are incorrect' });
          } else {
            loginData.userId=result.rows[0].id
            loginData.isAdmin=result.rows[0].isadmin
            loginData.username=result.rows[0].firstname
            delete(loginData.password)
            const token = helper.generateToken(loginData);
            return res.status(200).json({ "token": token, "message": "Login successful" });
          }
      }
    })
}



  static getAll (req, res) {
    const query = 'SELECT * FROM users'
    if(req.adminStatus){
      db.query(query)
      .then((result) => {
        if (result.rowCount ===0) {
          res.status(204).json({"status": 204, "message": "No Users Found"})
        } else if (result.rowCount >=1 ) {
            res.json({"status": 200, "data": result.rows})
        }
      })
      .catch((error) => {
        res.status(500).json({"status": 500, "message":"An error occurd when trying to get users from database"})
      })
    } else {
      res.status(403).json({"Message": "Only Admins can access this route"})
    }
  }


  static getOne (req, res) {
    let id = req.params.id
    if(req.adminStatus) {
      const query = `SELECT * FROM users WHERE ID='${id}'`
      db.query(query)
      .then((result) => {
        if (result.rowCount ===0) {
          res.status(204).json({"status": 204, "message": "No Such User Found"})
        } else if (result.rowCount >=1 ) {
            res.json({"status": 200, "data": result.rows})
        }
      })
      .catch((error) => {
        res.status(500).json({"status": 500, "message":"An error occurd when trying to get user from database"})
      })   
    } else {
      res.status(403).json({"status": 403, "message":"This is an admin functionality"})
    }
  }


  static getUserParcels (req, res) {
    const id = req.params.id
    if(req.adminStatus) {
      const query = `SELECT * FROM parcels WHERE placedBy='${id}'`
      db.query(query)
      .then((result) => {
        if (result.rowCount ===0) {
          res.status(400).json({"status": 400, "message": "User has no parcel delivery orders"})
        } else if (result.rowCount >=1 ) {
            res.status(200).json({"status": 200, "data": result.rows})
        }
      })
      .catch((error) => {
        res.status(500).json({"status": 500, "message":"An error occurd when trying to get user parcels from database"})
      })
    } else {
      res.status(403).json({"Message": "Only Admins can access this route"})
    }
  }


  static makeAdmin(req, res) {
    if (req.adminStatus) {
      const id = req.params.id;
      const adminstatus = true
      const query = `UPDATE users SET isadmin='${adminstatus}' WHERE id='${id}' RETURNING *` 
      db.query(query)
      .then((result) => {
        if(result.rowCount === 0) {
          return res.status(204).json({ "status": 204, "error": 'No such User'})
        } else if (result.rowCount >= 1) {
          res.status(200).json({"status": 200, "Message": "The user has been made an Admin successfully "});
        }
      })
      .catch((error) => {
        res.status(500).json({ "status": 500, "error": "An error occured while trying to make user an Admmin, try again"})
      })
  } else {
    res.status(403).json({"Message": "Only Admins can access this route"})
    }
  }
}

module.exports = User;