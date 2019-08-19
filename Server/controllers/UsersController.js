const moment = require ('moment');
// const db = require('../config/db');
const dotenv = require('dotenv');
const helper = require ('../helpers/helper');
const Users = require('../models/users');
const Parcels = require('../models/parcels');


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

    const UserData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      othernames: req.body.othernames,
      email: req.body.email,
      username: req.body.username,
      registered: moment(new Date()),
      isAdmin: 'false',
      password: hashedPassword
    };

    Users.findOne({
      where:{
        email:req.body.email
      }
    }).then(user =>{
      if(!user){
         Users.create(UserData)
        .then(user =>{
          res.status(200).send({status: user.email + " Registered Successfully"});
        })
        .catch(err =>{
          res.send('error:'+err)
        })

      }else{
       res.status(400).send({error:"User already exists"});
      }

    })
   .catch(err =>  {
    res.send('error: '+ err);
  })

}


  static login (req, res) {

  const fieldError = loginSchema(req.body)
  if (fieldError.error) return res.status(400).send(fieldError.error.details[0].message);


    const loginData = {
      email: req.body.email,
      password: req.body.password
    };

    Users.findOne({
      where:{
        email: req.body.email
      }
    }).then(user =>{
      if(user){
        // if(!helper.comparePassword(result.rows[0].password, req.body.password)) {
          if(!helper.comparePassword(user.password, req.body.password)) {
          return res.status(400).json({ 'message': 'The credentials you provided are incorrect' });
        }
        else{
          loginData.userId=user.id
          loginData.isAdmin=user.isadmin
          loginData.username=user.username
          delete(loginData.password)
          const token = helper.generateToken(loginData);
          return res.status(200).json({ "token": token, "message": "Login successful" });
        }
      }
      else{
        res.status(400).send("User does not exist");
      }
    })
    .catch(err => {
      res.send('error: '+ err);
    })
  }



  static getAll (req, res) {
    if(req.adminStatus){
      Users.findAll({raw:true}).then(AllUser =>{
        if(!AllUser){
          res.status(204).send({"status": 204, "message": "No Users Found"})
      }
      else{
        res.status(200).send({"status": 200, "data": AllUser})
      }
    })
    .catch(err => {
      res.send('error: '+ err);
    })
    }
    else{
      res.status(403).send({"Message": "Only Admins can access this route"})
    }

}



  static getOne (req, res) {
    if(req.adminStatus) {
      Users.findOne({
        where:{
          id: req.params.id
        }
      })

      .then(user =>{
        if(!user){
          res.status(204).send({"status": 204, "message": "No Such User Found"})
      }
      else{
        res.status(200).send({"status": 200, "data": user})
      }
    })
    .catch(err => {
      res.send('error: '+ err);
    })
    }
    else{
      res.status(403).send({"Message": "Only Admins can access this route"})
    }

}


  static getUserParcels (req, res) {

    if(req.adminStatus) {
      Parcels.findAll({
        where:{
          placedBy: req.params.id
        }
      })

      .then(result =>{
        if(!result){
          res.status(400).send({"status": 400, "message": "User has no parcel delivery orders"})
      }
      else{
        res.status(200).send({"status": 200, "data": result})
      }
    })
    .catch(err => {
      res.send('error: '+ err);
    })
    }
    else{
      res.status(403).send({"Message": "Only Admins can access this route"})
    }

}





  static makeAdmin(req, res) {
    if (req.adminStatus) {
      const adminstatus = true
      Users.update(
        {isadmin:true},
        {where : {
          id = req.params.id
        }}
        )
        .then(result => {
          if(!result){
            res.status(204).send({ "status": 204, "message": 'No such User'})
        }
        else{
          res.status(200).send({"status": 200, "Message": "The user has been made an Admin successfully "});
        }
      })
      .catch(err => {
        res.send('error: '+ err);
      })
      }
      else{
        res.status(403).send({"Message": "Only Admins can access this route"})
      }
  
  }
      
}




module.exports = User;