const moment = require('moment');
// const db  = require('../config/db');
const dotenv = require('dotenv');
const helper = require ('../helpers/helper');
const parcel = require('../models/parcels');

const {
  createParcelsSchema,
  destinationSchema,
  currentLocationSchema,
  changeStatusSchema
} = require('../helpers/validator');

dotenv.config();

class Parcels {
  static create(req, res) {

    const fieldError = createParcelsSchema(req.body)
    if (fieldError.error) return res.status(400).send(fieldError.error.details[0].message);

    let newOrder = {
      placedBy: req.user,
      weight: req.body.weight,
      weightmetric: 'kg',
      sentOn: moment(new Date()),
      status: 'pending',
      fromAddress: req.body.fromAddress,
      toAddress: req.body.toAddress,
      currentLocation: req.body.fromAddress,
      itemName: req.body.itemName,
      recipient: req.body.recipient
    };

      
    parcel.create(newOrder)
    .then(result =>{
      res.status(200).send({'status':200, 'message': result.itemName + " added Successfully"});
    })
    .catch(err =>{
      res.status(500).send({'status':500,'error':`An error occured while trying to save your order ${err}`})
    })
  }

  static getAll(req, res) {
      if(!req.adminStatus) {
        parcel.findAll({
          where:{
            placedBy: req.user
          }
        })
        .then(result =>{
          if(!result){
            res.status(204).send({"status": 204, "message": "User has no parcel delivery orders"})
        }
        else{
          res.status(200).send({"status": 200, "data": result})
        }
      })
      .catch(err => {
        res.send('error: '+ err);
      })
    }else{
      parcel.findAll({raw:true})
      .then(result =>{
        if(!result){
          res.status(204).send({"status": 204, "message": "No Parcels"})
      }
      else{
        res.status(200).send({"status": 200, "data": result})
      }
    })
    .catch(err => {
      res.send('error: '+ err);
    })
    }
  }


    static getOne(req, res) {
    if (!req.adminStatus) {

      parcel.findOne({
        where:{
          ID:req.params.id,
          placedBy: req.user
        }
      })
      .then(result =>{
        if(!result){
          res.status(204).send({"status": 204, "message": "You do not own such parcel delivery order"})
      }
      else{
        res.status(200).send({"status": 200, "data": result})
      }
    })
    .catch(err => {
      res.send('error: '+ err);
    })
  }else{
    parcel.findAll({
      where:{
        id:req.params.id,
      }
    })
    .then(result =>{
      if(!result){
        res.status(204).send({"status": 204, "message": "No such parcel"});
    }
    else{
      res.status(200).send({"status": 200, "data": result})
    }
  })
  .catch(err => {
    res.send('error: '+ err);
  })
  }
}


  static cancel(req, res) {
    const newStatus = 'canceled';
    Parcel.update(
        {status:newStatus},
        {where : {
          id : req.params.id,
          placedBy: req.user
        }}
        )
        .then(result => {
          if(!result){
            res.status(400).send({ "status": 400, "message": 'Only parcel owners can cancel their delivery order'})
        }
        else{
          res.status(200).send({"status": 200, "Message": "Your parcel delivery order has been cancelled ", 'data':result});
        }
      })
      .catch(err => {
        res.send('error: '+ err);
      })

  }


  static changeDestination(req, res) {

    const fieldError = destinationSchema(req.body)
    if (fieldError.error) return res.status(400).send(fieldError.error.details[0].message);

    const newDestination = req.body.toAddress

    Parcel.update(
      {toAddress:newDestination},
      {where : {
        id : req.params.id,
        placedBy: req.user
      }}
      )
      .then(result => {
        if(!result){
          res.status(204).json({ "status": 204, "message": 'Only parcel owners can change order destination'})
      }
      else{
        res.status(200).send({"status": 200, "Message": "The destination has been changed successfully ", 'data':result});
      }
    })
    .catch(err => {
      res.send('error: '+ err);
    })

  }



  static changeCurrentLocation(req, res) {
    if (req.adminStatus) {
      
      const fieldError = currentLocationSchema(req.body)
      if (fieldError.error) return res.status(400).send(fieldError.error.details[0].message);
     
      const currentLocation = req.body.currentLocation

      Parcel.update(
        {toAddress:currentLocation},
        {where : {
          id : req.params.id
        }}
        )
        .then(result => {
          if(!result){
            res.status(204).json({ "status": 204, "message": 'No such parcel'})
        }
        else{
          res.status(200).send({"status": 200, "Message": "The current location of the order has been updated successfully", 'data':result});
        }
      })
      .catch(err => {
        res.send('error: '+ err);
      })

  } else {
    res.send({"Message": "Only Admins can access this route"})
  }
}



static changeStatus(req, res) {
  if (req.adminStatus) {

    const fieldError = changeStatusSchema(req.body)
    if (fieldError.error) return res.status(400).send(fieldError.error.details[0].message);

    const status = req.body.status
    Parcel.update(
      {status:status},
      {where : {
        id : req.params.id,
        status: 'pending'
      }}
      )
      .then(result => {
        if(!result){
          res.status(204).json({ "status": 204, "message": 'This parcel delivery order might have been cancelled or delivered'})
      }
      else{
        helper.sendEmail()
        res.status(200).send({"status": 200, "Message": "The status of the parcel has been changed successfully", 'data':result});
      }
    })
    .catch(err => {
      res.send('error: '+ err);
    })
} else {
    res.json({"Message": "Only Admins can access this route"})
  }
}
}

module.exports = Parcels;