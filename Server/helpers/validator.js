const Joi = require('joi');


const signUpSchema = (params) => {
  const schema = {
    firstname: Joi.string().min(2).max(50).required(),   //validate
    lastname: Joi.string().min(2).max(50).required(),
    othernames:Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),  
    username: Joi.string().min(5).max(50).required()
  };
  return Joi.validate(params, schema);
}



const loginSchema = (params) => {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };
  return Joi.validate(params, schema);
}



const createParcelsSchema = (params) => {
    const schema = {
      placedBy: Joi.number().integer().positive().required(),
      weight: Joi.number().min(0).required(),
      fromAddress: Joi.string().min(5).max(255).required(),
      toAddress: Joi.string().min(5).max(255).required(),
      currentLocation: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(params, schema);
  }
  
  
  
  const destinationSchema = (params) => {
    const schema = {
      toAddress: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(params, schema);
  }

  

const currentLocationSchema = (params) => {
  const schema = {
    currentLocation: Joi.string().min(5).max(255).required()
  };
  return Joi.validate(params, schema);
}



const changeStatusSchema = (params) => {
  const schema = {
    status: Joi.string().valid('DELIVERED').uppercase().required()
  };
   return Joi.validate(params, schema);
}

const makeAdminSchema = {

}

module.exports = {
  signUpSchema, loginSchema, createParcelsSchema, destinationSchema, currentLocationSchema,
  changeStatusSchema, makeAdminSchema
}
