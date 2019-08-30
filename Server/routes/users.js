const express = require('express');
const UsersFromDatabase = require('../controllers/UsersController');
const Auth = require('../middleware/auth');


let router = express.Router();
router.use(express.json());

router.get('/', Auth.verifyToken,UsersFromDatabase.getAll);
router.get('/:id',Auth.verifyToken,UsersFromDatabase.getOne);
router.get('/:id/parcels',Auth.verifyToken,UsersFromDatabase.getUserParcels);
router.post('/:id/makeadmin',Auth.verifyToken,UsersFromDatabase.makeAdmin); 

module.exports = router;