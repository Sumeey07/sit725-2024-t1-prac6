const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Assuming server file is named server.js
const expect = chai.expect;

chai.use(chaiHttp);

  describe('GET /api/projects', () => {
    it('should get projects from MongoDB', (done) => {
      chai.request(server)
        .get('/api/projects')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('statusCode').equal(200);
          expect(res.body).to.have.property('message').equal('Success');
          expect(res.body.data).to.be.an('array').that.is.not.empty;
          done();
        });
    });
  });
