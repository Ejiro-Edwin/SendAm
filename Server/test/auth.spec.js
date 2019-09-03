const Auth = require('../controllers/UsersController'); 
const chai =  require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); 

let should = chai.should();
chai.use(chaiHttp)
const request = chai.request(app)

describe ('Authentication Tests', () => {
  afterEach((done) => {
    done();
    console.log("In test")
  });
  describe('/POST login to the application', () => {
    it('return a token and a message', (done) => {
      let loginData = {
       email: "ejirotesting@gmail.com",
       password: "password"
      };
      chai.request(app)
          .post('/api/v1/auth/login')
          .send(loginData)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('token');
            res.body.should.have.property('message');
            done();
          });
    });
  });
  describe('/POST signup already existing user', () => {
    it('should not be successful', (done) => {
      let loginData = {
        firstname: "Ejiro",
        lastname: "Obamrevwo",
        email: "ejiroedwin@gmail.com",
        username: "Ejiro.123",
        password: "password"
      };
      chai.request(app)
          .post('/api/v1/auth/signup')
          .send(loginData)
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            done();
          });
    });
  });
})
describe('something', () => {
  true.should.be.true
})